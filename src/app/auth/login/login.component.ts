import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isError: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
  }

  signIn(form: NgForm) {
    this.authenticationService.SignIn(form.value.email, form.value.password).then((res: any) => {
      console.log('You are Successfully logged in!', res);
      form.reset();
    }).catch((err: { message: any; }) => {
      this.isError = true;
      form.reset();
      console.log('Something is wrong:', err.message);
    });
  }
}
