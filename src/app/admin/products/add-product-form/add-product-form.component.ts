import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  ngOnInit(): void {
    this.initializeForm();
  }

  public addProductForm!: FormGroup;

  public initializeForm(): void {
    this.addProductForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productQuantityStock: new FormControl(null, Validators.required),
    });
  }
}
