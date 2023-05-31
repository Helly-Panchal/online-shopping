import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product.interface';

@Pipe({
  name: 'filterProduct'
})
export class FilterPipe implements PipeTransform {

  transform(products: IProduct[], filterText: string) {
    if (filterText === "" || products.length === 0) {
      return products;
    }
    else {
      return products.filter((product) => {
        return product.name.toLowerCase().includes(filterText.toLocaleLowerCase());
      })
    }
  }

}
