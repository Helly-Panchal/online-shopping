import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/order.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  public item!: IProduct[];
  public getOrderSubscription!: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IOrder, public dialogRef: MatDialogRef<OrdersDetailComponent>,
    private placeOrderService: PlaceOrderService) {
    this.item = data.item;
    console.log(data);
  }

  public ngOnInit(): void {
    this.placeOrderService.getOrderedItems();
  }

  public ngOnDestroy(): void {
    this.getOrderSubscription.unsubscribe();
  }

  public close() {
    this.dialogRef.close();
  }

  public cancelOrder() {
    if (this.data.status === 'pending') {
      this.placeOrderService.cancelOrder(this.data.id);
      this.close();
    }
    this.placeOrderService.getOrderedItems().subscribe({
      next: ((res: any) => {
        this.data = res;
      })
    });
  }
}
