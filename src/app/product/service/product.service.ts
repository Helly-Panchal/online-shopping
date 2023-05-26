import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  addProduct() {
    const product = {
      name: 'Samsung Phone',
      describe: 'good bettery life, fast charging',
      price: '123',
    };
    console.log(this.db.database.ref('products').push(product));
  }

  getProduct() {
    this.db
      .list('products')
      .valueChanges()
      .subscribe({
        next: (res) => {
          console.log("GetProduct", res);
        },
      });
  }
}
