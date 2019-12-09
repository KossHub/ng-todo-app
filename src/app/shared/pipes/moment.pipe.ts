import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
  transform(m: moment.Moment, format: string = 'L'): string {
    return m.format(format);
  }
}
