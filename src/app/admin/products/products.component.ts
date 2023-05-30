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
  public updatedId!: string | null;

  constructor(public dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // openForm(): void {
  //   this.dialog.open(AddProductFormComponent,
  //     {
  //       width: '100%'
  //     });
  // }

  public getProducts() {
    return this.productService.getProduct().subscribe(res => {
      this.products = res;
    });
  }

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).then(() => {
      console.log("Deleted");
      this.productService.getProduct();
    });
  }

  public addProduct(): void {
    let product: IProduct = {
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
    };
    const dialogRef = this.dialog.open(AddProductFormComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res != undefined) {
          this.productService.addProduct({
            name: res.productName,
            description: res.productDescription,
            price: res.productPrice,
            stock: res.productQuantityStock,
          });
        }
      },
    });
  }

  editProduct(product: IProduct) {
    const dialogRef = this.dialog.open(AddProductFormComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.updatedId = product.id;
        if (res != undefined) {
          this.productService.updateProduct(this.updatedId, {
            name: res.productName,
            description: res.productDescription,
            price: res.productPrice,
            stock: res.productQuantityStock,
          });
        }
      },
    });
  }
}
