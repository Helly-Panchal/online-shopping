import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



@NgModule({
  declarations: [
    CartComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
