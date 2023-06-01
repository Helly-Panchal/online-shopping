import { IProduct } from "./product.interface";

export interface IOrder {
  id: string;
  item: IProduct;
  price: number;
  orderedDate: string;
  status: string;
  paymentMode: string
}
