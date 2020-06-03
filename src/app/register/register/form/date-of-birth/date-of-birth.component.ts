import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register-date-of-birth',
  templateUrl: './date-of-birth.component.html'
})
export class RegisterDateOfBirthComponent {
  @Input() registerForm: FormGroup;
  @Input() bsConfig: Partial<BsDatepickerConfig>;
}
