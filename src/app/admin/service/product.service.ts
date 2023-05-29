import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  addProduct(formData: object) {
    // const product = {
    //   name: 'Samsung Phone',
    //   description: 'good bettery life, fast charging',
    //   price: '123',
    //   stock: '10'
    // };
    return this.db.database.ref('products').push(formData);
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
    console.log("deleted : ", this.db.database.ref('products').child('-NWa9NrvVr8ZsAtaMNKO').remove());
    this.getProduct();
  }

  public updateProduct() {
    const updateData = {
      name: 'Vivo Phone',
      description: 'good bettery life, fast charging',
      price: '456',
      stock: '10'
    };
    console.log("updated", this.db.database.ref('products').child('-NWa9NrvVr8ZsAtaMNKO').update(updateData));
    this.getProduct();
  }
}
