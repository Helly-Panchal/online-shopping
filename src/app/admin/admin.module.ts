import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductsComponent } from './products/products.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component';
import { EditUserFormComponent } from './edit-user-form/edit-user-form.component';
import { AdminViewOrderComponent } from './admin-view-order/admin-view-order.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersListComponent,
    AddProductFormComponent,
    UserCardComponent,
    EditUserFormComponent,
    AdminViewOrderComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
})
export class AdminModule { }
