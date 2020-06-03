import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { ResolverHelper } from './resolver-helper';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private authService: AuthService,
    private resolverHelper: ResolverHelper
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.resolverHelper.handleGetUser(
      +this.authService.decodedToken.getValue().nameid
    );
  }
}
