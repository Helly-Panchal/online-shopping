import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { IProduct } from '../../interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products!: IProduct[];
  public updatedId!: string | null;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public getproductsubscription!: Subscription;
  public addproductsubscription!: Subscription;
  public editproductsubscription!: Subscription;

  constructor(public dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getproductsubscription.unsubscribe();
    if (this.addproductsubscription || this.editproductsubscription) {
      this.addproductsubscription.unsubscribe();
      this.editproductsubscription.unsubscribe();
    }
  }

  public getProducts() {
    this.isLoading = true;
    this.getproductsubscription = this.productService.getProduct().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      }
    });
    return this.getproductsubscription;
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
      data: product
    });
    this.addproductsubscription = dialogRef.afterClosed().subscribe({
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
    this.editproductsubscription = dialogRef.afterClosed().subscribe({
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

  public deleteProduct(id: string) {
    this.productService.deleteProduct(id).then(() => {
      console.log("Deleted");
      this.productService.getProduct();
    });
  }
}
