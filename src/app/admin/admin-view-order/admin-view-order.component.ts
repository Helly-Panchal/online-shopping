import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IOrder } from 'src/app/interfaces/order.interface';
import { IProduct } from 'src/app/interfaces/product.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';

@Component({
  selector: 'app-admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss']
})
export class AdminViewOrderComponent {
  public item!: IProduct[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IOrder, public dialogRef: MatDialogRef<AdminViewOrderComponent>,
    private placeOrderService: PlaceOrderService) {
    this.item = data.item;
    console.log(data);
  }

  public ngOnInit(): void {
    this.placeOrderService.getAllOrdersOfAllUsers();
  }

  public close() {
    this.dialogRef.close();
  }

  public completeOrder() {
    if (this.data.status === 'pending') {
      this.placeOrderService.completeOrder(this.data.uid!, this.data.id);
      this.close();
    }
    this.placeOrderService.getAllOrdersOfAllUsers().subscribe({
      next: ((res: any) => {
        this.data = res;
      })
    });
  }
}
