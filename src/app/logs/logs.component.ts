import { Component, OnInit } from '@angular/core';
import { ITask, LogsTasksService } from '../shared/services/logs/tasks.service';
import { LogsDateService } from '../shared/services/logs/date.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logTypes: string[] = ['future', 'monthly', 'weekly', 'daily'];

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit() {
  }
}
