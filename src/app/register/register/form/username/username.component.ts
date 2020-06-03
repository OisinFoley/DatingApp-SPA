import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-username',
  templateUrl: './username.component.html'
})
export class RegisterUsernameComponent {
  @Input() registerForm: FormGroup;
}
