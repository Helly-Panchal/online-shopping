import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent
  ]
})
export class AdminModule { }
