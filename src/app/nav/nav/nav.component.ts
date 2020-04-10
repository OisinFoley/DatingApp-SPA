import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.auth.login(this.model)
      .subscribe((response: any) => {
        console.log('login success');
      }, error => {
        console.log(error);
      });
  }

  // TODO: set an isLoggedIn prop instead of calling this func multiple times within the template
  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
