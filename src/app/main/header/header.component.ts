import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public filterText: string = '';

  constructor(private productService: ProductService) { }

  public search(filterText: any) {
    this.productService.filter$.next(filterText);
  }
}
