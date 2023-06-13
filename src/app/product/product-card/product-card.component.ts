import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  public counter: number = 0;

  constructor(private cartService: CartService) { }

  public increaseQuantity() {
    this.counter = this.counter + 1;
  }

  public decreaseQuantity() {
    if (this.counter > 0) {
      this.counter = this.counter - 1;
    }
    else {
      this.counter = 0;
    }
  }

  public addToCart(product: IProduct, counter: number) {
    product.stock = counter;
    this.cartService.addToCart(product);
    alert("Item is added to cart..!!!");
    this.counter = 0;
  }
}
