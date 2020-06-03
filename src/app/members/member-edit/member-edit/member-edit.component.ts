import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  private _user: User;
  private _photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  get user(): User { return this._user; }
  set user(e: User) { this._user = e; }
  get photoUrl(): string { return this._photoUrl; }
  set photoUrl(e: string) { this._photoUrl = e; }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.authService.photoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    const authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
    this.userService.updateUser(authenticatedUserId, this.user)
      .subscribe(() => {
        this.alertify.success('Profile updated successfully');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  onUpdateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
