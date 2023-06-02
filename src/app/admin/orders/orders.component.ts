import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IOrder } from 'src/app/interfaces/order.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';
import { AdminViewOrderComponent } from '../admin-view-order/admin-view-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public allOrdersList: IOrder[] = [];

  constructor(private placeOrderService: PlaceOrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllOrdersOfAllUsers();
  }

  public getAllOrdersOfAllUsers() {
    this.placeOrderService.getAllOrdersOfAllUsers().subscribe({
      next: ((res) => {
        this.allOrdersList = res;
        console.log(res);
      })
    })
  }

  public viewOrder(order: IOrder) {
    const dialogRef = this.dialog.open(AdminViewOrderComponent, {
      data: order,
      width: '50%'
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res != undefined) {
          this.getAllOrdersOfAllUsers();
        }
      },
    });
  }

}
