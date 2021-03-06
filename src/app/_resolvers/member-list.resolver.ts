import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { ResolverHelper } from './resolver-helper';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  private pageNumber = 1;
  private pageSize = 12;

  constructor(private resolverHelper: ResolverHelper) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.resolverHelper.handleGetUsers(this.pageNumber, this.pageSize);
  }
}
