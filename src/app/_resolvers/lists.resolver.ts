import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 12;
  likesParams = 'Likers';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  // TODO: can we reduce duplication between this class and member-list.resolver?
  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParams)
      .pipe(
        catchError(() => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
