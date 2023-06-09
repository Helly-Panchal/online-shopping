import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  public status: string = '404';
  public errorMessage: string = 'Page Not Found';

  constructor(private router: Router) { }

  public goTo() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    if (user.role === 'admin') {
      this.router.navigateByUrl('/layout/admin/products');
    }
    else {
      this.router.navigateByUrl('/layout/products');
    }
  }
}
