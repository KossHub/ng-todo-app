import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LogsDateService } from 'src/app/shared/services/logs/date.service';
import { LogsTasksService, ITask } from 'src/app/shared/services/logs/tasks.service';

@Component({
  selector: 'app-tasks-scrollbar',
  templateUrl: './tasks-scrollbar.component.html',
  styleUrls: ['./tasks-scrollbar.component.scss']
})
export class TasksScrollbarComponent implements OnInit {
  @Input() tasks: ITask[];
  @Input() lType: string;
  @Output() openNewTaskForm: EventEmitter<any> = new EventEmitter();
  @Output() openEditTaskForm: EventEmitter<any> = new EventEmitter();
  @Output() createNewTask: EventEmitter<any> = new EventEmitter();
  @Output() editTask: EventEmitter<any> = new EventEmitter();
  @Output() removeTask: EventEmitter<any> = new EventEmitter();

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit() {
  }
}
