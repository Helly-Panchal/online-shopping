import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authenticationService: AuthenticationService) { }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
  }

  public email!: string;
  public password!: string;

  signIn(form: NgForm) {
    this.authenticationService.SignIn(form.value.email, form.value.password);
    this.email = '';
    this.password = '';
  }
}
