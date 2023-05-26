import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  // Sign up
  SignUp(email: string, password: string) {
    console.log(email, password);

    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      console.log('You are Successfully signed up!', res);
    }).catch((error: { message: any; }) => {
      console.log('Something is wrong:', error.message);
    });
  }

  // Sign in
  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
      console.log('You are Successfully logged in!');
    }).catch((err: { message: any; }) => {
      console.log('Something is wrong:', err.message);
    });
  }

  // Sign out
  SignOut() {
    this.angularFireAuth.signOut();
  }
}

