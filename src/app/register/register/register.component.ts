import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { LoginParams } from 'src/app/_interfaces/login-params';
import { RegisterInput } from 'src/app/_interfaces/register-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  private _registerInput: RegisterInput;
  private _registerForm: FormGroup;
  private _bsConfig: Partial<BsDatepickerConfig>;

  get registerInput(): RegisterInput { return this._registerInput; }
  set registerInput(e: RegisterInput) { this._registerInput = e; }
  get registerForm(): FormGroup { return this._registerForm; }
  set registerForm(e: FormGroup) { this._registerForm = e; }
  get bsConfig(): Partial<BsDatepickerConfig> { return this._bsConfig; }
  set bsConfig(e: Partial<BsDatepickerConfig>) { this._bsConfig = e; }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this._createRegisterForm();
  }

  private _createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this._passwordMatchValidator });
  }

  private _passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { passwordsMismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.registerInput = {...this.registerForm.value};
      this.authService.register(this.registerInput)
        .subscribe(() => {
          this.alertify.success('Registration successful');
        }, error => {
          this.alertify.error(error);
        }, () => {
          const loginParams = this.registerInput as LoginParams;
          this.authService.login(loginParams)
            .subscribe(() => {
              this.router.navigate(['/members']);
            });
        });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
