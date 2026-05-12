export class LoginDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    if (!email) {
      throw new Error('Email is required');
    }
    if (!password) {
      throw new Error('Password is required');
    }
    this.email = email;
    this.password = password;
  }
}