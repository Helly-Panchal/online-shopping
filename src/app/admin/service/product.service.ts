import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  addProduct() {
    const product = {
      name: 'Samsung Phone',
      description: 'good bettery life, fast charging',
      price: '123',
      stock: '10'
    };
    console.log(this.db.database.ref('products').push(product));
  }

  getProduct() {
    return this.db
      .list('products')
      .valueChanges().pipe(
        map((res: any) => {
          const list: any[] = [];
          Object.keys(res).forEach((x) => {
            res[x].id = x;
            list.push(res[x]);
          });
          return list;
        })
      );
  }

  deleteProduct() {
    console.log("deleted : ", this.db.database.ref('products').child('-NW_wRLlvABau7Ay0YZq').remove());
    this.getProduct();
  }
}
