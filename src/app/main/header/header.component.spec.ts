import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        FormsModule,
        AppRoutingModule
      ],
      providers: [AuthenticationService]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user is not logged in then show only register and login routes', () => {
    const links = [
      {
        title: 'Register',
        href: 'register',
      },
      {
        title: 'Login',
        href: 'login',
      }];
    (component as any).authService.user$.next(null);
    expect(component.links).toEqual(links);
  });

  it('user is loggedIn and role is admin then show admin and profile routes', () => {
    const links = [
      {
        title: 'Admin',
        href: '/layout/admin',
      },
      {
        title: 'Profile',
        href: '/layout/profile',
      },
    ];
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'admin'
    });
    expect(component.links).toEqual(links);
  });

  it('user is loggedIn and role is customer then show products, cart ,my-orders and profile routes', () => {
    const links = [
      {
        title: 'Products',
        href: '/layout/products',
      },
      {
        title: 'Cart',
        href: '/layout/cart',
      },
      {
        title: 'My Orders',
        href: '/layout/my-orders',
      },
      {
        title: 'Profile',
        href: '/layout/profile',
      },
    ];
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'customer'
    });
    expect(component.links).toEqual(links);
  });

  it('if user is not loggedIn then isLoggedIn is false', () => {
    (component as any).authService.user$.next(null);
    expect(component.isLoggedIn).toEqual(false);
  });

  it('if user is loggedIn and role is admin then isLoggedIn is true', () => {
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'admin'
    });
    expect(component.isLoggedIn).toEqual(true);
  });

  it('if user is loggedIn and role is customer then isLoggedIn is true', () => {
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'customer'
    });
    expect(component.isLoggedIn).toEqual(true);
  });

  it('if user is not loggedIn and role is admin then isAdmin is false', () => {
    (component as any).authService.user$.next(null);
    expect(component.isAdmin).toEqual(false);
  });

  it('if user is loggedIn and role is admin then isAdmin is true', () => {
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'admin'
    });
    expect(component.isAdmin).toEqual(true);
  });

  it('if user is loggedIn and role is customer then isAdmin is false', () => {
    (component as any).authService.user$.next({
      uid: 'string',
      name: 'John',
      email: 'john@gmail.com',
      role: 'customer'
    });
    expect(component.isAdmin).toEqual(false);
  });
});
