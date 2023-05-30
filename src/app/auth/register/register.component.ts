import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public email!: string;
  public password!: string;
  public role!: string;

  constructor(private authenticationService: AuthenticationService) { }

  onSubmit(register: NgForm) {
    console.log(register);
  }

  signUp(form: NgForm) {
    this.authenticationService.SignUp(form.value.email, form.value.password, form.value.role);
    this.email = '';
    this.password = '';
    this.role = '';
    console.log(form.value.role);

  }
}
