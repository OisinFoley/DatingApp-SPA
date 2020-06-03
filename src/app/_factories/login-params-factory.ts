import { LoginParams } from '../_interfaces/login-params';

export class LoginParamsFactory implements LoginParams {
  username: '';
  password: '';
  constructor() {
    return {
      username: this.username,
      password: this.password
    };
  }
}
