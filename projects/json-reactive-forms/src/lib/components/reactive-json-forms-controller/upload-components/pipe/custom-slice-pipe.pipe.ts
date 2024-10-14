import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlicePipe'
})
export class CustomSlicePipePipe implements PipeTransform {
  transform(value: any, ...args: any[]): unknown {
    let start_index: any = args[0];
    let batch_size: any = args[1];
    if (start_index > 0) {
      let b = ((start_index + 1) * batch_size);
      let end = value.length > b ? b : value.length;
      let a = b - args[1];
      let data: any = value.slice(a, end);
      return data;
    }
    return value.slice(start_index, batch_size);
  }
}
