import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public isError: boolean = false;

  constructor(private authenticationService: AuthenticationService, private db: AngularFireDatabase) { }

  signUp(form: NgForm) {
    this.authenticationService.SignUp(form.value.email, form.value.password).then((res: any) => {
      console.log('You are Successfully signed up!', res);
      const user = {
        email: res.user?.email,
        uid: res.user?.uid,
        role: form.value.role,
        name: form.value.name
      };
      this.db.database.ref('users').push(user);
      if (res) {
        form.reset();
      }
    }).catch((error: { message: any; }) => {
      this.isError = true;
      form.reset();
      console.log('Something is wrong:', error.message);
    });
  }
}
