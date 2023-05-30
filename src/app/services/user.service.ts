import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  public getUsers() {
    return this.db.object('users').valueChanges().pipe(
      map((res: any) => {
        const usersList: any[] = [];
        if (res != null) {
          Object.keys(res).forEach((i) => {
            res[i].id = i;
            usersList.push(res[i]);
          })
        }
        return usersList;
      })
    )
  }

  public updateUser(id: string, data: any) {
    console.log("updated", this.db.database.ref('users').child(id).update(data));
    this.getUsers();
  }
}
