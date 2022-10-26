import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'num2str'
})
export class Num2strPipe implements PipeTransform {

  transform(value: number): string {
    return value ? value.toString() : '';
  }

}
