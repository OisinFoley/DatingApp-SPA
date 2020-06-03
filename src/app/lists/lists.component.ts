import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pagination, PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  private _users: User[];
  private _pagination: Pagination;
  private _likesParam: string;

  get users(): User[] { return this._users; }
  set users(e: User[]) { this._users = e; }
  get pagination(): Pagination { return this._pagination; }
  set pagination(e: Pagination) { this._pagination = e; }
  get likesParam(): string { return this._likesParam; }
  set likesParam(e: string) { this._likesParam = e; }

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    return this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
}
