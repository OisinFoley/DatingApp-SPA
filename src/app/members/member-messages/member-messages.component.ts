import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Message } from 'src/app/_models/Message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  authenticatedUserId: number;
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
    this.loadMessages();
  }

  private loadMessages() {
    this.userService.getMessageThread(this.authenticatedUserId, this.recipientId)
    .pipe(
      tap(messages => {
        for (const message of messages) {
          const { isRead, recipientId, id } = message;
          if (!isRead && recipientId === this.authenticatedUserId) {
            this.userService.markMessageAsRead(this.authenticatedUserId, id);
          }
        }
      })
    )
    .subscribe((res: Message[]) => {
      this.messages = res;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authenticatedUserId, this.newMessage)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error(error);
      });
  }
}
