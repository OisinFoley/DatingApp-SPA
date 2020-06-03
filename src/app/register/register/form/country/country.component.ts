import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-country',
  templateUrl: './country.component.html'
})
export class RegisterCountryComponent {
  @Input() registerForm: FormGroup;
}
