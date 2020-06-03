import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-gender',
  templateUrl: './gender.component.html'
})
export class RegisterGenderComponent {
  @Input() registerForm: FormGroup;
}
