import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  private pageNumber = 1;
  private pageSize = 12;
  private messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    const { nameid } = this.authService.decodedToken.getValue();
    return this.userService.getMessages(+nameid, this.pageNumber, this.pageSize, this.messageContainer)
      .pipe(
        catchError(() => {
          this.alertify.error('Problem retrieving messages');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
