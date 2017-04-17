import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumPrice'
})
export class SumPricePipe implements PipeTransform {

  transform(value: Array<string>, args?: any): any {
    let sum = 0;
    value.forEach(element => {
      sum = sum + parseFloat(element);
    });
    return sum;
  }

}
