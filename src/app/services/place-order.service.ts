import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IProduct } from '../interfaces/product.interface';
import { map } from 'rxjs';

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
      orderedDate: new Date().toString(),
      status: 'pending',
      paymentMode: 'cash on delivery'
    }

    const user = JSON.parse(localStorage.getItem('userData')!);
    return this.db.database.ref('orders').child(user.uid).push(order);
  }

  getOrderedItems() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    return this.db.object(`orders/${user.uid}`).valueChanges().pipe(
      map((res: any) => {
        const orderList: any[] = [];
        if (res != null) {
          Object.keys(res).forEach((x) => {
            if (res[x].Status !== 'canceled') {
              orderList.push({ id: x, ...res[x] });
            }
          })
        }
        return orderList;
      })
    )
  }
}
