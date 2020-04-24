import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  private authenticatedId: number = null;
  private currentMain: Photo;

  // TODO: can we make private?
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.apiUri;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.authenticatedId = +this.authService.decodedToken.getValue().nameid;
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/users/${this.authenticatedId}/photos`,
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
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(+this.authenticatedId, photo.id)
      .subscribe(() => {
        this.currentMain = this.photos.filter(p => p.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        this.alertify.success('Main photo updated');
      }, error => {
        this.alertify.error(error);
      });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(+this.authenticatedId, id)
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
