import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { ResolverHelper } from './resolver-helper';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(private resolverHelper: ResolverHelper) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.resolverHelper.handleGetUser(route.params.id);
  }
}
