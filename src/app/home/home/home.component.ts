import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private _isRegisterMode = false;
  private _isLearnMoreMode = false;
  private _hideHomeNavButtons = false;
  get isRegisterMode(): boolean { return this._isRegisterMode; }
  set isRegisterMode(e: boolean) { this._isRegisterMode = e; }
  get isLearnMoreMode(): boolean { return this._isLearnMoreMode; }
  set isLearnMoreMode(e: boolean) { this._isLearnMoreMode = e; }
  get hideHomeNavButtons(): boolean { return this._hideHomeNavButtons; }
  set hideHomeNavButtons(e: boolean) { this._hideHomeNavButtons = e; }

  registerToggle() {
    this.isRegisterMode = true;
    this.hideHomeNavButtons = true;
  }

  cancelRegisterMode(isRegisterMode: boolean) {
    this.isRegisterMode = isRegisterMode;
    this.hideHomeNavButtons = false;
  }

  learnMoreToggle() {
    this.isLearnMoreMode = true;
    this.hideHomeNavButtons = true;
  }

  cancelLearnMoreMode(isLearnMoreMode: boolean) {
    this.isLearnMoreMode = isLearnMoreMode;
    this.hideHomeNavButtons = false;
  }
}
