import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-known-as',
  templateUrl: './known-as.component.html'
})
export class RegisterKnownAsComponent {
  @Input() registerForm: FormGroup;
}
