import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  public filterText: string = '';
  public productList!: IProduct[];
  public isLoading: boolean = true;
  public isError: boolean = false;
  public searchSubscription!: Subscription;
  public getProductSubscription!: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchSubscription = this.productService.filter$.pipe(debounceTime(300)).subscribe({
      next: (res) => {
        this.filterText = res;
      }
    })
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.getProductSubscription.unsubscribe();
  }

  public getAllProducts(): void {
    this.isLoading = true;
    this.getProductSubscription = this.productService.getProduct().subscribe({
      next: (res) => {
        this.productList = res;
        this.isLoading = false;
        this.isError = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }
}
