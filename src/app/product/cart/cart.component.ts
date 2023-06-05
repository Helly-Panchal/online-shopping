import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { PlaceOrderService } from 'src/app/services/place-order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItem: IProduct[] = [];
  public totalCartPrice!: number;
  public cartSubscription!: Subscription;

  constructor(private cartService: CartService, private placeOrderService: PlaceOrderService) { }

  public ngOnInit(): void {
    this.getCartItems();
  }

  public ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  public getCartItems(): void {
    this.cartSubscription = this.cartService.getCart().subscribe({
      next: ((res: any) => {
        if (res) {
          this.cartItem = res;
        } else {
          this.cartItem = [];
        }
        this.totalCartPrice = this.cartItem.reduce((total, value) => {
          return total + (value.stock * value.price);
        }, 0);
      })
    });
  }

  public emptyCart(): void {
    this.cartService.emptyCart();
    this.getCartItems();
  }

  public deleteOneCartItem(id: string) {
    this.cartService.deleteOneCartItem(id);
    this.getCartItems();
  }

  public placeOrder() {
    this.placeOrderService.placeOrder(this.cartItem).then(() => {
      alert("Your order has been placed successfully..!!");
      this.emptyCart();
    });
  }
}
