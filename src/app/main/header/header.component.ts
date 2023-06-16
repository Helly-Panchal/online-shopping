import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public filterText: string = '';
  public isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  public links: { title: string, href: string }[] = [];
  public authSubscription!: Subscription;

  constructor(private productService: ProductService, private authService: AuthenticationService) { }

  public ngOnInit(): void {
    this.authSubscription = this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.isLoggedIn = true;
          this.isAdmin = user.role === 'admin' ? true : false;
          if (this.isAdmin) {
            this.links = [
              {
                title: 'Admin',
                href: '/layout/admin',
              },
              {
                title: 'Profile',
                href: '/layout/profile',
              },
            ];
          } else {
            this.links = [
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
          }
        } else {
          this.isLoggedIn = false;
          this.isAdmin = false;
          this.links = [
            {
              title: 'Register',
              href: 'auth/register',
            },
            {
              title: 'Login',
              href: 'auth/login',
            },
          ];
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public search(filterText: any) {
    this.productService.filter$.next(filterText);
  }

  public trackHeaderLinks(index: number, element: any) {
    return element.id;
  }
}
