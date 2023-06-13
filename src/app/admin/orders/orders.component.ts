import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IOrder } from 'src/app/interfaces/order.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';
import { AdminViewOrderComponent } from '../admin-view-order/admin-view-order.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  public allOrdersList: IOrder[] = [];
  public isLoading: boolean = true;
  public isError: boolean = false;
  public getSubscription!: Subscription;
  public viewSubscription!: Subscription;

  constructor(private placeOrderService: PlaceOrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllOrdersOfAllUsers();
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    if (this.viewSubscription) {
      this.viewSubscription.unsubscribe();
    }
  }

  public getAllOrdersOfAllUsers() {
    this.isLoading = true;
    this.getSubscription = this.placeOrderService.getAllOrdersOfAllUsers().subscribe({
      next: ((res) => {
        this.allOrdersList = res;
        this.isLoading = false;
        this.isError = false;
        console.log(res);
      }),
      error: ((error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      })
    });
  }

  public viewOrder(order: IOrder) {
    const dialogRef = this.dialog.open(AdminViewOrderComponent, {
      data: order,
      width: '50%'
    });
    this.viewSubscription = dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res != undefined) {
          this.getAllOrdersOfAllUsers();
        }
      },
    });
  }
}
