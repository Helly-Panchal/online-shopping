import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartList: IProduct[] = [];

  constructor(private db: AngularFireDatabase) { }

  getCart() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    return this.db.object(`cart/${user.uid}`).valueChanges().pipe(tap((res: any) => {
      if (res) {
        this.cartList = res;
      } else {
        this.cartList = [];
      }
    }));
  }

  addToCart(cartItems: IProduct) {
    const user = JSON.parse(localStorage.getItem('userData')!);
    const index = this.cartList.findIndex((p: any) => p.id == cartItems.id);

    if (index == -1) {
      this.cartList.push(cartItems);
    }
    else {
      this.cartList[index].stock += cartItems.stock;
    }
    return this.db.database.ref('cart').child(user.uid).set(this.cartList);
  }

  emptyCart() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    this.db.database.ref('cart').child(user.uid).remove();
  }

  deleteOneCartItem(id: string) {
    const user = JSON.parse(localStorage.getItem('userData')!);
    const index = this.cartList.findIndex((p: any) => p.id == id);
    this.cartList.splice(index, 1);
    this.db.database.ref('cart').child(user.uid).set(this.cartList);
  }
}
