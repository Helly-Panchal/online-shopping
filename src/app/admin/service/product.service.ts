import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  addProduct(formData: object) {
    return this.db.database.ref('products').push(formData);
  }

  getProduct() {
    return this.db
      .object('products')
      .valueChanges().pipe(
        map((res: any) => {
          const productsList: any[] = [];
          if (res != null) {
            Object.keys(res).forEach((x) => {
              res[x].id = x;
              productsList.push(res[x]);
            });
          }
          return productsList;
        })
      );
  }

  deleteProduct(id: string) {
    return this.db.database.ref('products').child(id).remove();
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
