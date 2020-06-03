import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  private _authenticatedUserId: number = null;
  private _currentMain: Photo;
  private _baseUrl = environment.apiUri;
  private _uploader: FileUploader;
  private _hasBaseDropZoneOver = false;

  get uploader(): FileUploader { return this._uploader; }
  set uploader(e: FileUploader) { this._uploader = e; }
  get hasBaseDropZoneOver(): boolean { return this._hasBaseDropZoneOver; }
  set hasBaseDropZoneOver(e: boolean) { this._hasBaseDropZoneOver = e; }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this._authenticatedUserId = +this.authService.decodedToken.getValue().nameid;
    this._initializeUploader();
  }

  private _initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this._baseUrl}/users/${this._authenticatedUserId}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      // 10MB maxFileSize
      maxFileSize: 10 * 1024 * 1024
    });

    // FileUploader class tries to send credentials by default, hence we disable it
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    // grab photo from response and immediately update list
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const { id, url, dateAdded, description, isMain } = JSON.parse(response);
        const photo = { id, url, dateAdded, description, isMain };
        this.photos.push(photo);
        if (photo.isMain) {
          this._updateUserPhotoInfo(photo.url, this.authService.currentUser);
        }
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(+this._authenticatedUserId, photo.id)
      .subscribe(() => {
        this._currentMain = this.photos.filter(p => p.isMain === true)[0];
        this._currentMain.isMain = false;
        photo.isMain = true;
        this._updateUserPhotoInfo(photo.url, this.authService.currentUser);
        this.alertify.success('Main photo updated');
      }, error => {
        this.alertify.error(error);
      });
  }

  private _updateUserPhotoInfo(photoUrl: string, currentUser: User) {
    this.authService.changeMemberPhoto(photoUrl);
    this.authService.currentUser.photoUrl = photoUrl;
    localStorage.setItem('user', JSON.stringify(currentUser));
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(+this._authenticatedUserId, id)
        .subscribe(() => {
          this.photos.splice(
            this.photos.findIndex(p => p.id === id), 1
          );
          this.alertify.success('Photo has been deleted');
        }, error => {
          this.alertify.error(error);
        });
    });
  }
}
