import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IOrder } from 'src/app/interfaces/order.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  public orderedItemsContainer: IOrder[] = [];
  public isLoading: boolean = true;
  public isError: boolean = false;

  public order$ = new Observable<IOrder>();

  constructor(private placeOrderService: PlaceOrderService, public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.getOrderedItems();
  }

  public getOrderedItems() {
    this.isLoading = true;
    this.placeOrderService.getOrderedItems().subscribe({
      next: ((res: any) => {
        this.orderedItemsContainer = res;
        this.isLoading = false;
        this.isError = false;
      }),
      error: ((error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      })
    });
  }

  public viewOrder(order: IOrder) {
    const dialogRef = this.dialog.open(OrdersDetailComponent, {
      data: order,
      width: '50%'
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res != undefined) {
          this.placeOrderService.getOrderedItems();
        }
      },
    });
  }
}
