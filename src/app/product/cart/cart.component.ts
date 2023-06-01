import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItem: IProduct[] = [];
  public totalCartPrice!: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.initializeCart();
    this.cartItem = this.cartService.getCart();
    this.totalCartPrice = this.cartItem.reduce((total, value) => {
      return total + (value.stock * value.price);
    }, 0);
  }



}
