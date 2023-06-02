import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IProduct } from '../interfaces/product.interface';
import { map } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private db: AngularFireDatabase) { }

  // to place orders
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

  // get all orders ordered by perticular user
  getOrderedItems() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    return this.db.object(`orders/${user.uid}`).valueChanges().pipe(
      map((res: any) => {
        const orderList: any[] = [];
        if (res != null) {
          Object.keys(res).forEach((x) => {
            if (res[x].status !== 'cancel') {
              orderList.push({ id: x, ...res[x] });
            }
          })
        }
        return orderList;
      })
    )
  }

  // user can cancel order
  cancelOrder(status: string, orderId: string) {
    const user = JSON.parse(localStorage.getItem('userData')!);
    return this.db.database.ref(`orders/${user.uid}`).child(orderId).update({ status: status });
  }

  // get orders of all the users
  getAllOrdersOfAllUsers() {
    return this.db.object('orders').valueChanges().pipe(
      map((res: any) => {
        const allOrderList: IOrder[] = [];
        if (res != null) {
          Object.keys(res).forEach((x: any) => {
            Object.keys(res[x]).forEach((y: any) => {
              allOrderList.push({ id: y, uid: x, ...res[x][y] })
            })
          });
        }
        return allOrderList;
      })
    )
  }
}
