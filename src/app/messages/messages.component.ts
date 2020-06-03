import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  private _messages: Message[];
  private _pagination: Pagination;
  private _messageContainer = 'Unread';
  private _authenticatedUserId: number;

  get messages(): Message[] { return this._messages; }
  set messages(e: Message[]) { this._messages = e; }
  get pagination(): Pagination { return this._pagination; }
  set pagination(e: Pagination) { this._pagination = e; }
  get messageContainer(): string { return this._messageContainer; }
  set messageContainer(e: string) { this._messageContainer = e; }
  get authenticatedUserId(): number { return this._authenticatedUserId; }
  set authenticatedUserId(e: number) { this._authenticatedUserId = e; }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
    this.authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
  }

  loadMessages() {
    this.userService.getMessages(this.authenticatedUserId, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authenticatedUserId).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
    });
  }
}
