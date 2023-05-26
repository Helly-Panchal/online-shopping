import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email!: string;
  public password!: string;

  constructor(private authenticationService: AuthenticationService) { }

  onSubmit(register: NgForm) {
    console.log(register);
  }

  signUp(form: NgForm) {
    this.authenticationService.SignUp(form.value.email, form.value.password);
    this.email = '';
    this.password = '';
  }
}
