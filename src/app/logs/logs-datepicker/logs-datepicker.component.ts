import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';

import { LogsDateService } from 'src/app/shared/services/logs/date.service';
import { LogsTasksService } from 'src/app/shared/services/logs/tasks.service';

@Component({
  selector: 'app-logs-datepicker',
  templateUrl: './logs-datepicker.component.html',
  styleUrls: ['./logs-datepicker.component.scss']
})
export class LogsDatepickerComponent implements OnInit {
  dateFormatString: string = '';
  isOpened: boolean = false;
  options: DatepickerOptions = {
    firstCalendarDay: 1
  };

  @Input() lType: string;
  @Output() changeLogDate: EventEmitter<any> = new EventEmitter();

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit(): void {
    this.setDateFormat();
  }

  changeDate(date: Date): void {
    this.changeLogDate.emit(date);
    this.setDateFormat();
  }

  setDateFormat() {
    const currentDate = moment(
      this.logsDateService.datepickerDates[this.lType]
    );
    switch (this.lType) {
      case 'monthly': {
        this.dateFormatString = currentDate.format('MMMM YYYY');
        break;
      }
      case 'weekly': {
        const firstDayOfWeek = currentDate.isoWeekday(1).format('MMM Do YYYY');
        const lastDayOfWeek = currentDate.isoWeekday(7).format('MMM Do YYYY');
        this.dateFormatString = `${firstDayOfWeek} - ${lastDayOfWeek}`;
        break;
      }
      case 'daily': {
        this.dateFormatString = currentDate.format('MMMM Do YYYY dddd');
      }
    }
  }

  openDatepicker(): void {
    this.isOpened = true;
    this.logsTasksService.setActiveNewTaskForm();
  }

  closeDatepicker():void {
    this.isOpened = false;
  }
}
