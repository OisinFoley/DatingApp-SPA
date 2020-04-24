import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Token } from '../_interfaces/Token';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUri}/auth`;
  jwtHelper = new JwtHelperService();
  currentUser: User;
  decodedToken: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
  photoUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  changeMemberPhoto(url: string) {
    this.photoUrl.next(url);
  }

  // TODO: add type to arg
  login(credentials: any) {
    return this.http.post(this.baseUrl + '/login', credentials).pipe(
      map((response: any) => {
        if (response) {
          const { token, user } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.decodedToken.next(this.jwtHelper.decodeToken(token));
          this.currentUser = user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
