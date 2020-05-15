import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  username = 'User';
  photoUrl = '';

  // TODO: fix bug whereby photo is not appearing after login unless we refresh browser
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.decodedToken.subscribe(token => {
      this.username = token.unique_name;
    });
    this.authService.photoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.authService.login(this.model)
      .subscribe(() => {
        this.alertify.success('login success');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  // TODO: set an isLoggedIn prop instead of calling this func multiple times within the template
  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken.next(null);
    this.authService.changeMemberPhoto(null);
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
