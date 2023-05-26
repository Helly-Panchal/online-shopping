import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.addProduct();
  }

  getProduct() {
    this.productService.getProduct();
  }
}
