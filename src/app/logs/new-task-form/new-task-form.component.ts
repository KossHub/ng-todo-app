import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { LogsTasksService, ITask, TaskMarksEnum } from '../../shared/services/logs/tasks.service';
import { LogsDateService } from 'src/app/shared/services/logs/date.service';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit, AfterViewInit {
  task: ITask = {
    date: null,
    lType: '',
    content: '',
    mark: 0,
    inProgress: false,
    isDone: false
  };

  @Input() lType: string;
  @Output() createNewTask: EventEmitter<any> = new EventEmitter;

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService
  ) {}

  ngOnInit(): void {
    this.task.lType = this.lType;
    this.task.date = this.logsDateService.logsDates[this.lType];
  }

  ngAfterViewInit(): void {
    document.getElementById('new-task').scrollIntoView({ block: 'nearest' });
  }

  markTask(mark: TaskMarksEnum): void {
    this.task.mark = mark;
  }

  closeNewTaskForm(): void {
    this.logsTasksService.setActiveNewTaskForm();
  }
}
