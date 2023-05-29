import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { IProduct } from '../interfaces/product.interface';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  public products!: IProduct[];

  constructor(public dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  openForm(): void {
    this.dialog.open(AddProductFormComponent, {
      width: '100%'
    });
  }

  public getProducts() {
    return this.productService.getProduct().subscribe(res => {
      console.log(res);

      this.products = res;
    });
  }

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).then(() => {
      console.log("Deleted");
      this.productService.getProduct();
    });
  }

  public updateProduct(): void {
    this.productService.updateProduct();
  }

}
