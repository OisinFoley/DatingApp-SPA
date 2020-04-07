import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(private auth: AuthService) {}

  ngOnInit() {
  }

  register() {
    console.log('register clicked', this.model);
    this.auth.register(this.model)
      .subscribe((response: any) => {
        console.log('registration success');
      }, error => {
        console.log(error);
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel clicked');
  }

}
