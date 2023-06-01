import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<any>;
  public isUserLoggedIn: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.userData = angularFireAuth.authState;
  }

  // Sign up
  SignUp(email: string, password: string, role: string, name: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      console.log('You are Successfully signed up!', res);
      const user = {
        email: res.user?.email,
        uid: res.user?.uid,
        role: role,
        name: name
      };
      this.db.database.ref('users').push(user);
      if (res) {
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.router.navigate(['/layout/products']);
      }
    }).catch((error: { message: any; }) => {
      console.log('Something is wrong:', error.message);
    });
  }

  // Sign in
  SignIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
      console.log('You are Successfully logged in!');
      if (res) {
        console.log(res);
        localStorage.setItem('userData', JSON.stringify(res.user));
        this.router.navigate(['/layout/products']);
      }
    }).catch((err: { message: any; }) => {
      console.log('Something is wrong:', err.message);
    });
  }

  // Sign out
  SignOut() {
    this.angularFireAuth.signOut();
    localStorage.removeItem('userData');
    localStorage.removeItem('cartItems');
    this.router.navigate(['/login']);
  }
}

