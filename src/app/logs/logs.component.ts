import { Component, OnInit } from '@angular/core';

import { ITask, LogsTasksService } from 'src/app/shared/services/logs/tasks.service';
import { LogsDateService } from 'src/app/shared/services/logs/date.service';
import { LoaderService } from '../shared/services/loader.service';

interface ITasks {
  [lType: string]: ITask[];
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  tasks: ITasks;
  logTypes: string[] = ['future', 'monthly', 'weekly', 'daily'];

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.tasks = {};
    this.logTypes.forEach((lType) => this.tasks[lType] = []);
    for (let log in this.tasks) {
      this.getTasks(log);
    }
  }

  changeLogDate(date: Date, lType: string): void {
    this.logsDateService.changeDate(date, lType);
    this.getTasks(lType);
  }

  sortTasks(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) => {
      if (a.isDone === b.isDone) {
        return (b.mark - a.mark);
      }
      return (Number(a.isDone) - Number(b.isDone));
    })
  }

  getTasks(lType: string): void {
    const date = this.logsDateService.logsDates[lType];
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.getTasks(date, lType).subscribe(
      (tasks) => this.tasks[lType] = this.sortTasks(tasks),
      (error) => console.log('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  createNewTask(task: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.createTask(task).subscribe(
      (task) => {
        if (task.date === this.logsDateService.logsDates[task.lType]) {
          this.tasks[task.lType].push(task);
        }
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  editTask(editableTask: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.editTask(editableTask).subscribe(
      (task) => {
        const i = this.tasks[task.lType].findIndex((item) => (
          item.id === task.id
        ));
        this.tasks[task.lType][i] = task;
        this.tasks[task.lType] = this.sortTasks(this.tasks[task.lType]);
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  removeTask(removableTask: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.removeTask(removableTask).subscribe(
      () => {
        this.tasks[removableTask.lType] = this.tasks[
          removableTask.lType
        ].filter((task) => task.id !== removableTask.id);
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  migrateTaskToFutureLog(): void {
    this.migrateTask('no date');
  }

  migrateTask(newDate: string): void {
    const { taskToMigrate } = this.logsTasksService;
    this.createNewTask({
       ...taskToMigrate,
       date: newDate,
       lType: this.logsTasksService.migrateTo
    });
    this.removeTask(taskToMigrate);
  }
}
