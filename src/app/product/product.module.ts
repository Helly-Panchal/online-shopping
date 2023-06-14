import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { HoverDirective } from '../directives/hover.directive';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    FilterPipe,
    HoverDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
