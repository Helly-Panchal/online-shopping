import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
  }

  public email!: string;
  public password!: string;

  signIn(form: NgForm) {
    this.authenticationService.SignIn(form.value.email, form.value.password).then((res: any) => {
      console.log('You are Successfully logged in!', res);
      this.email = '';
      this.password = '';
    }).catch((err: { message: any; }) => {
      console.log('Something is wrong:', err.message);
    });
  }
}
