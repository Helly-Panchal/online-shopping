import { IProduct } from "./product.interface";

export interface IOrder {
  id: string;
  uid?: string,
  item: IProduct[];
  price: number;
  orderedDate: string;
  status: string;
  paymentMode: string
}
