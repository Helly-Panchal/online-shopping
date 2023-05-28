import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private productService: ProductService, public dialog: MatDialog) { }

  public getProducts(): void {
    this.productService.getProduct();
  }

  public addProducts(): void {
    this.productService.addProduct();
  }

  public deleteProduct(): void {
    this.productService.deleteProduct();
  }

  openForm(): void {
    this.dialog.open(AddProductFormComponent, {
      width: '100%'
    });
  }
}
