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
  @Output() openNewTaskForm: EventEmitter<null> = new EventEmitter();
  @Output() openEditTaskForm: EventEmitter<string> = new EventEmitter();
  @Output() createNewTask: EventEmitter<ITask> = new EventEmitter();
  @Output() editTask: EventEmitter<ITask> = new EventEmitter();
  @Output() removeTask: EventEmitter<ITask> = new EventEmitter();
  @Output() migrateTaskToFutureLog: EventEmitter<null> = new EventEmitter();

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit() {
  }
}
