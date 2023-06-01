import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/interfaces/order.interface';
import { PlaceOrderService } from 'src/app/services/place-order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  public orderedItemsContainer: IOrder[] = [];

  constructor(private placeOrderService: PlaceOrderService) { }

  public ngOnInit(): void {
    this.getOrderedItems();
  }

  public getOrderedItems() {
    this.placeOrderService.getOrderedItems().subscribe({
      next: ((res: any) => {
        this.orderedItemsContainer = res;
        console.log(this.orderedItemsContainer);
      })
    });
  }
}
