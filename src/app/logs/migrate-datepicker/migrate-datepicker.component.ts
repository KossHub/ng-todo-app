import { Component } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import * as moment from 'moment';
import { LogsDateService } from 'src/app/shared/services/logs/date.service';
import { LogsTasksService } from 'src/app/shared/services/logs/tasks.service';

@Component({
  selector: 'app-migrate-datepicker',
  templateUrl: './migrate-datepicker.component.html',
  styleUrls: ['./migrate-datepicker.component.scss']
})
export class MigrateDatepickerComponent {
  date = new Date();
  options: DatepickerOptions = { firstCalendarDay: 1 };

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  defineLogDate(date: Date): string {
    switch (this.logsTasksService.migrateTo) {
      case 'monthly': {
        return moment(date).date(1).format('MM-DD-YYYY');
      }
      case 'weekly': {
        return moment(date).isoWeekday(1).format('MM-DD-YYYY');
      }
      case 'daily': {
        return moment(date).format('MM-DD-YYYY');
      }
    }
  }

  onSelectDate(): void {
    this.logsTasksService.migrateTask(this.defineLogDate(this.date));
    this.closeMigrateDatepicker();
  }

  closeMigrateDatepicker(): void {
    this.logsDateService.closeMigrateDatepicker();
  }
}
