import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-confirm-password',
  templateUrl: './confirm-password.component.html'
})
export class RegisterConfirmPasswordComponent {
  @Input() registerForm: FormGroup;
}
