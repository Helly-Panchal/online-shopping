import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    CartComponent,
    MyOrdersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
