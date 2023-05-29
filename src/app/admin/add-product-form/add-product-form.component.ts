import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  public addProductForm!: FormGroup;
  public product: IProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productQuantityStock: new FormControl(null, Validators.required),
    });
  }

  public addProducts() {
    this.product.name = this.addProductForm.value.productName;
    this.product.description = this.addProductForm.value.productDescription;
    this.product.price = this.addProductForm.value.productPrice;
    this.product.stock = this.addProductForm.value.productQuantityStock;
    this.productService.addProduct(this.product);
  }
}
