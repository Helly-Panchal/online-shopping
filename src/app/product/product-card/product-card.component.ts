import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  public counter: number = 1;

  public increaseQuantity() {
    this.counter = this.counter + 1;
  }

  public decreaseQuantity() {
    if (this.counter > -1) {
      this.counter = this.counter - 1;
    }
    else {
      this.counter = 1;
    }
  }
}
