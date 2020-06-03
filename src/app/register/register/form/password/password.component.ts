import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-password',
  templateUrl: './password.component.html'
})
export class RegisterPasswordComponent {
  @Input() registerForm: FormGroup;
}
