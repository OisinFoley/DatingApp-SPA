import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

import { User } from 'src/app/_models/user';
import { MembersHelper } from '../../members-helper';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  private _user: User;
  private _galleryOptions: NgxGalleryOptions[];
  private _galleryImages: NgxGalleryImage[];

  get user(): User { return this._user; }
  set user(e: User) { this._user = e; }
  get galleryOptions(): NgxGalleryOptions[] { return this._galleryOptions; }
  set galleryOptions(e: NgxGalleryOptions[]) { this._galleryOptions = e; }
  get galleryImages(): NgxGalleryImage[] { return this._galleryImages; }
  set galleryImages(e: NgxGalleryImage[]) { this._galleryImages = e; }

  constructor(
    private route: ActivatedRoute,
    private membersHelper: MembersHelper
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params.tab;
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

    this.galleryOptions = this.membersHelper.getGalleryOptions();
    this.galleryImages = this._getImages();
  }

  private _getImages() {
    const imageURLs = [];
    for (const photo of this.user.photos) {
      imageURLs.push({
        small: photo.url,
        medium : photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageURLs;
  }

  sendLike(user: User) {
    this.membersHelper.handleSendLike(user);
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
