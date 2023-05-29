import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { IProduct } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  public products!: IProduct[];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    return this.productService.getProduct().subscribe(res => {
      this.products = res;
    });
  }

  public addProducts(): void {
    this.productService.addProduct();
  }

  public deleteProduct(): void {
    this.productService.deleteProduct();
  }

  public updateProduct(): void {
    this.productService.updateProduct();
  }

  openForm(): void {
    this.dialog.open(AddProductFormComponent, {
      width: '100%'
    });
  }
}
