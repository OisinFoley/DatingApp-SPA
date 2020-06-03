import { Component, Input } from '@angular/core';

import { User } from 'src/app/_models/user';
import { MembersHelper } from '../../members-helper';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() user: User;
  constructor(private membersHelper: MembersHelper) {}

  sendLike(user: User) {
    this.membersHelper.handleSendLike(user);
  }
}
