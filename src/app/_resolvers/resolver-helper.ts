import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverHelper {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  handleGetUsers(pageNumber: number, pageSize: number, likesParams?: any, userParams?: any) {
    return this.userService.getUsers(pageNumber, pageSize, userParams, likesParams)
    .pipe(
      catchError(() => this._handleError('/home'))
    );
  }

  handleGetUser(userId: number) {
    return this.userService.getUser(userId)
    .pipe(
      catchError(() => this._handleError('/members'))
    );
  }

  private _handleError(redirectionRoute: string) {
    this.alertify.error('Problem retrieving data');
    this.router.navigate([`${redirectionRoute}`]);
    return of(null);
  }
}
