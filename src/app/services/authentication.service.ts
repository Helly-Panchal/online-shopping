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

  constructor(
    private _fireAuth: AngularFireAuth,
    private userService: UserService,
    private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase,
  ) {
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
            if (userData.role === 'admin') {
              this.router.navigateByUrl('layout/admin/products');
            }
            else {
              this.router.navigateByUrl('/layout');
            }
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
  SignUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in
  SignIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  SignOut() {
    this.angularFireAuth.signOut();
    this.router.navigate(['/login']);
  }
}

