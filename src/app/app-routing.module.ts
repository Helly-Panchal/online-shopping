import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MyOrdersComponent } from './product/my-orders/my-orders.component';
import { CartComponent } from './product/cart/cart.component';
import { LayoutComponent } from './main/layout/layout.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductsComponent } from './admin/products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'layout', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'admin', component: AdminDashboardComponent,
        canActivate: [RoleGuard],
        children: [
          { path: 'products', component: ProductsComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'users', component: UsersListComponent },
          { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
      },
      { path: 'my-orders', component: MyOrdersComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: UserProfileComponent },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
