import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';


@NgModule({
  declarations: [
    CartComponent,
    MyOrdersComponent,
    ProductListComponent,
    ProductCardComponent,
    FilterPipe,
    OrdersDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ProductModule { }
