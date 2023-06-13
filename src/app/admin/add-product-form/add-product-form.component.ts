import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/product.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductFormComponent implements OnInit {

  public addProductForm!: FormGroup;
  public updatedId!: string | null;

  public product: IProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0
  };

  constructor(public dialogRef: MatDialogRef<AddProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.addProductForm = new FormGroup({
      productName: new FormControl(this.data.name, Validators.required),
      productDescription: new FormControl(this.data.description, Validators.required),
      productPrice: new FormControl(this.data.price, Validators.required),
      productQuantityStock: new FormControl(this.data.stock, Validators.required),
      id: new FormControl(this.data.id, Validators.required),
    });
  }

  public addProducts() {
    console.log(this.addProductForm.value);
    this.dialogRef.close(this.addProductForm.value);
  }

  public close() {
    this.dialogRef.close();
  }
}
