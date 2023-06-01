import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private db: AngularFireDatabase) { }

  placeOrder(cartItems: IProduct[]) {

    const totalCost = cartItems.reduce((total, value) => {
      return total + (value.stock * value.price);
    }, 0);

    const order = {
      item: cartItems,
      price: totalCost,
      OrderedDate: new Date(),
      Status: 'pending'
    }

    const user = JSON.parse(localStorage.getItem('userData')!);
    this.db.database.ref('orders').child(user.uid).push(order);
  }
}
