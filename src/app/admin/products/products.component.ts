import { Component } from '@angular/core';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private productService: ProductService) { }

  public getProducts(): void {
    this.productService.getProduct();
  }

  public addProducts(): void {
    this.productService.addProduct();
  }

  public deleteProduct(): void {
    this.productService.deleteProduct();
  }
}
