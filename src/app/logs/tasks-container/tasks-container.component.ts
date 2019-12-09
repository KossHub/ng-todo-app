import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { LogsDateService } from 'src/app/shared/services/logs/date.service';
import { LogsTasksService, ITask } from 'src/app/shared/services/logs/tasks.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnDestroy {
  @Input() tasks: ITask[];
  @Input() lType: string;

  @Output() changeLogDate: EventEmitter<Date> = new EventEmitter();
  @Output() createNewTask: EventEmitter<ITask> = new EventEmitter();
  @Output() editTask: EventEmitter<ITask> = new EventEmitter();
  @Output() removeTask: EventEmitter<ITask> = new EventEmitter();
  @Output() migrateTaskToFutureLog: EventEmitter<null> = new EventEmitter();

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.closeNewTaskForm();
    this.closeEditTaskForm();
  }

  onCreateNewTask(task: ITask) {
    this.createNewTask.emit(task);
    this.closeNewTaskForm();
  }

  openNewTaskForm(): void {
    this.logsTasksService.setActiveNewTaskForm(this.lType);
  }

  closeNewTaskForm(): void {
    this.logsTasksService.setActiveNewTaskForm();
  }

  openEditTaskForm(id: string): void {
    this.logsTasksService.setActiveEditTaskForm(id);
  }

  closeEditTaskForm(): void {
    this.logsTasksService.setActiveEditTaskForm();
  }
}
