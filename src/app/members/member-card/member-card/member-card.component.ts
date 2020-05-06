import { Component, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() user: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  sendLike(userToLikeId: number) {
    const authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
    this.userService.sendLike(authenticatedUserId, userToLikeId).subscribe(data => {
      this.alertify.success(`You have liked: ${this.user.knownAs}`);
    }, error => {
      this.alertify.error(error);
    });
  }
}
