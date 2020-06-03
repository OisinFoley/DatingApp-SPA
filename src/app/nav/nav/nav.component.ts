import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LoginParams } from 'src/app/_interfaces/login-params';
import { LoginParamsFactory } from 'src/app/_factories/login-params-factory';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private _authData: LoginParams = new LoginParamsFactory();
  private _username = 'User';
  private _photoUrl = '';

  get authData(): LoginParams { return this._authData; }
  set authData(e: LoginParams) { this._authData = e; }
  get username(): string { return this._username; }
  set username(e: string) { this._username = e; }
  get photoUrl(): string { return this._photoUrl; }
  set photoUrl(e: string) { this._photoUrl = e; }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.username.subscribe(name => {
      this.username = name;
    });
    this.authService.photoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this.authService.login(this.authData)
      .subscribe(() => {
        this.alertify.success('Login success');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken.next(null);
    this.authService.changeMemberPhoto(null);
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
