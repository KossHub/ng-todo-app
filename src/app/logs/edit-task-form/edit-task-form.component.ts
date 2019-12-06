import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask, LogsTasksService } from 'src/app/shared/services/logs/tasks.service';
import { LogsDateService } from 'src/app/shared/services/logs/date.service';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.scss']
})
export class EditTaskFormComponent implements OnInit {
  editableTask: ITask;

  @Input() task: ITask;
  @Output() editTask: EventEmitter<ITask> = new EventEmitter();
  @Output() removeTask: EventEmitter<ITask> = new EventEmitter();

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit(): void {
    this.editableTask = { ...this.task };
  }

  onSave(): void {
    this.editTask.emit(this.editableTask);
    this.closeEditTaskForm();
  }

  onDelete(): void {
    this.removeTask.emit(this.editableTask);
  }

  closeEditTaskForm(): void {
    this.logsTasksService.setActiveEditTaskForm();
  }

  markTask(mark): void {
    this.editableTask.mark = mark;
  }

  onInProgress(): void {
    this.editableTask.inProgress = true;
    this.editableTask.isDone = false;
    this.onSave();
  }

  onNotInProgress(): void {
    this.editableTask.inProgress = false;
    this.editableTask.isDone = false;
    this.onSave();
  }

  onDone(): void {
    this.editableTask.isDone = true;
    this.editableTask.inProgress = false;
    this.onSave();
  }

  onNotDone(): void {
    this.editableTask.isDone = false;
    this.editableTask.inProgress = false;
    this.onSave();
  }

  setTaskToMigrate(newLogType: string): void {
    this.logsTasksService.setTaskToMigrate(this.editableTask, newLogType);
    this.logsDateService.openMigrateDatepicker();
    this.closeEditTaskForm()
  }

  migrateToFutureLog() {
    this.logsTasksService.setTaskToMigrate(this.editableTask, 'future');
    this.logsTasksService.migrateTask('no date');
    this.closeEditTaskForm()
  }
}
