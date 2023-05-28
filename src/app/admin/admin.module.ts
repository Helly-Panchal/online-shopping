import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { AddProductFormComponent } from './products/add-product-form/add-product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    AddProductFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDialogModule,

  ],
  exports: [
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
  ]
})
export class AdminModule { }
