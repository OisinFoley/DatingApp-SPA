import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Token } from '../_interfaces/token';
import { User } from '../_models/user';
import { LoginParams } from '../_interfaces/login-params';
import { RegisterInput } from '../_interfaces/register-input';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _baseUrl = `${environment.apiUri}/auth`;
  private readonly _jwtHelper = new JwtHelperService();
  private _currentUser: User;
  readonly decodedToken: BehaviorSubject<Token> = new BehaviorSubject(null);
  readonly photoUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  readonly username: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get baseUrl(): string { return this._baseUrl; }
  get jwtHelper(): JwtHelperService { return this._jwtHelper; }
  get currentUser(): User { return this._currentUser; }
  set currentUser(e: User) { this._currentUser = e; }

  constructor(private http: HttpClient) {}

  private _changeUsername(name: string) {
    this.username.next(name);
  }

  private _handleUser(user: User) {
    this.currentUser = user;
    this.changeMemberPhoto(this.currentUser.photoUrl);
  }

  handleToken(encodedToken: string) {
    const decodedToken: Token = this.jwtHelper.decodeToken(encodedToken);
    const { unique_name } = decodedToken;
    this.decodedToken.next(decodedToken);
    this._changeUsername(unique_name);
  }

  changeMemberPhoto(url: string) {
    this.photoUrl.next(url);
  }

  login(credentials: LoginParams) {
    return this.http.post(this.baseUrl + '/login', credentials).pipe(
      map((response: any) => {
        if (response) {
          const { token, user } = response;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.handleToken(token);
          this._handleUser(user);
        }
      })
    );
  }

  register(user: RegisterInput) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
