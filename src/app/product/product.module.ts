import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';


@NgModule({
  declarations: [
    CartComponent,
    MyOrdersComponent,
    ProductsComponent,
    ProductListComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ProductModule { }
