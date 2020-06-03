import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { UserParams } from 'src/app/_interfaces/user-params';
import { Gender } from 'src/app/_interfaces/gender';
import { MembersHelper } from '../members-helper';






@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  private readonly _user: User = JSON.parse(localStorage.getItem('user'));
  private _users: User[];
  private _pagination: Pagination;
  private _genderList: Gender[] = [];
  private _userParams: UserParams = {};

  get users(): User[] { return this._users; }
  set users(e: User[]) { this._users = e; }
  get pagination(): Pagination { return this._pagination; }
  set pagination(e: Pagination) { this._pagination = e; }
  get user(): User { return this._user; }
  get genderList(): Gender[] { return this._genderList; }
  set genderList(e: Gender[]) { this._genderList = e; }
  get userParams(): UserParams { return this._userParams; }
  set userParams(e: UserParams) { this._userParams = e; }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private membersHelper: MembersHelper
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.genderList = this.membersHelper.getGenderList();
    this.membersHelper.setDefaultMemberListFilteringParams(this.user.gender, this.userParams);
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.membersHelper.setDefaultMemberListFilteringParams(this.user.gender, this.userParams);
    this.loadUsers();
  }

  loadUsers() {
    return this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
