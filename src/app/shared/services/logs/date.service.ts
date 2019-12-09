import { Injectable } from '@angular/core';
import * as moment from 'moment';

interface IDatepickerDates {
  monthly: Date;
  weekly: Date;
  daily: Date;
}

interface ILogsDates {
  future: string;
  monthly: string;
  weekly: string;
  daily: string;
}

const TODAY: Date = new Date();

@Injectable({ providedIn: 'root' })
export class LogsDateService {
  public datepickerDates: IDatepickerDates = {
    monthly: TODAY,
    weekly: TODAY,
    daily: TODAY
  };
  public logsDates: ILogsDates = {
    future: 'no date',
    monthly: moment(TODAY).date(1).format('MM-DD-YYYY'),
    weekly: moment(TODAY).isoWeekday(1).format('MM-DD-YYYY'),
    daily: moment(TODAY).format('MM-DD-YYYY')
  };
  public isMigrateDatepickerShown: boolean = false;

  changeDate(date: Date, lType: string): void {
    const logDate: string = lType === 'monthly'
      ? moment(date).date(1).format('MM-DD-YYYY')
      : lType === 'weekly'
      ? moment(date).isoWeekday(1).format('MM-DD-YYYY')
      : lType === 'daily'
      ? moment(date).format('MM-DD-YYYY')
      : 'no date';
    this.datepickerDates[lType] = date;
    this.logsDates[lType] = logDate;
  }

  openMigrateDatepicker(): void {
    this.isMigrateDatepickerShown = true;
  }

  closeMigrateDatepicker(): void {
    this.isMigrateDatepickerShown = false;
  }
}
