import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public userData!: Observable<any>;
  public isUserLoggedIn: boolean = false;

  public authSubscription!: Subscription;

  public user$ = new BehaviorSubject<IUser | null>(null);

  // constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,) {
  //   this.userData = angularFireAuth.authState;
  // }

  constructor(
    private _fireAuth: AngularFireAuth,
    private userService: UserService,
    private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,
  ) {
    this.userData = angularFireAuth.authState;
    this._fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.authSubscription = this.userService.getUsers().subscribe({
          next: (users) => {
            const userData: IUser = users.filter((u) => u.uid === user.uid)[0];
            this.user$.next({
              uid: userData.uid,
              name: userData.name,
              email: userData.email,
              role: userData.role,
            });
            localStorage.setItem('userData', JSON.stringify(userData));
          },
        });
      } else {
        this.user$.next(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('cartItems');
      }
    });
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
        // localStorage.setItem('userData', JSON.stringify(res.user));
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
        this.router.navigate(['/layout/products']);
      }
    }).catch((err: { message: any; }) => {
      console.log('Something is wrong:', err.message);
    });
  }

  // Sign out
  SignOut() {
    this.angularFireAuth.signOut();
    this.router.navigate(['/login']);
  }
}

