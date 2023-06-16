import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertComponent } from 'src/app/shared-module/alert/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private closeSub!: Subscription;
  public error: string | undefined;
  @ViewChild('error', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

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
      this.error = "Email Id already exists.Please login or try another Email Id to register.";
      this.showAlert();
      form.reset();
      console.log('Something is wrong:', error.message);
    });
  }

  public showAlert() {
    const componentRef = this.viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = this.error!;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.viewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }
}
