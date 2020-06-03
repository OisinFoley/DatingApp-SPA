import { Injectable } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryOptions } from 'ngx-gallery';

import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { GenderValue, GenderDisplay } from '../_enum/gender';
import { Gender } from '../_interfaces/gender';
import { UserParams } from '../_interfaces/user-params';

@Injectable({
  providedIn: 'root'
})
export class MembersHelper {
  private _defaultMinAge = 18;
  private _defaultMaxAge = 99;
  get defaultMinAge(): number { return this._defaultMinAge; }
  get defaultMaxAge(): number { return this._defaultMaxAge; }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  handleSendLike(user: User) {
    const authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
    this.userService.sendLike(authenticatedUserId, user.id).subscribe(data => {
      this.alertify.success(`You have liked: ${user.knownAs}`);
    }, error => {
      this.alertify.error(error);
    });
  }

  getGalleryOptions(): NgxGalleryOptions[] {
    return [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

  getGenderList(): Gender[] {
    return [
      { value: GenderValue.Male, display: GenderDisplay.Male },
      { value: GenderValue.Female, display: GenderDisplay.Female }
    ];
  }

  setDefaultMemberListFilteringParams(
    authenticatedUserGender: string, userParams: UserParams) {
      userParams.gender =
        authenticatedUserGender === 'female' ? 'male' : 'female';
      userParams.minAge = this.defaultMinAge;
      userParams.maxAge = this.defaultMaxAge;
      userParams.orderBy = 'lastActive';
  }
}
