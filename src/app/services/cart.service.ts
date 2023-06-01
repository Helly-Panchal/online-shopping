import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  initializeCart(): void {
    const cart = localStorage.getItem('cartItems');
    if (!cart) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }

  getCart() {
    this.initializeCart();
    return JSON.parse(localStorage.getItem('cartItems')!);
  }

  addToCart(product: IProduct) {
    this.initializeCart();
    const cart = JSON.parse(localStorage.getItem('cartItems')!);
    const index = cart.findIndex((p: any) => p.id == product.id);
    if (index == -1) {
      cart.push(product);
    }
    else {
      cart[index].stock += product.stock;
    }
    return localStorage.setItem('cartItems', JSON.stringify(cart));
  }

  emptyCart() {
    localStorage.removeItem('cartItems');
  }

  deleteOneCartItem(product: IProduct) {
    const cart: IProduct[] = JSON.parse(localStorage.getItem('cartItems')!);
    const index = cart.findIndex((p) => p.id == product.id);
    cart.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }
}
