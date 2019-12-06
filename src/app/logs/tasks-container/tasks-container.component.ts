import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LogsDateService } from '../../shared/services/logs/date.service';
import { LogsTasksService, ITask } from '../../shared/services/logs/tasks.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit, OnDestroy {
  tasks: ITask[] = [];

  @Input() lType: string;

  constructor(
    public logsDateService: LogsDateService,
    public logsTasksService: LogsTasksService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.closeNewTaskForm();
    this.closeEditTaskForm();
  }

  sortTasks(tasks: ITask[]): ITask[] {
    return tasks.sort((a, b) => {
      if (a.isDone === b.isDone) {
        return (b.mark - a.mark);
      }
      return (Number(a.isDone) - Number(b.isDone));
    })
  }

  getTasks(): void {
    const date = this.logsDateService.logsDates[this.lType];
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.getTasks(date, this.lType).subscribe(
      (tasks) => this.tasks = this.sortTasks(tasks),
      (error) => console.log('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  changeLogDate(date: Date) {
    this.logsDateService.changeDate(date, this.lType);
    this.getTasks();
  }

  createNewTask(task: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.createTask(task).subscribe(
      (task) => {
        this.tasks.push(task);
        this.closeNewTaskForm();
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  editTask(editableTask: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.editTask(editableTask).subscribe(
      (task) => {
        const i = this.tasks.findIndex((item) => item.id === task.id);
        this.tasks[i] = task;
        this.tasks = this.sortTasks(this.tasks);
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
  }

  removeTask(removableTask: ITask): void {
    this.loaderService.addRequestsInPending(1);
    this.logsTasksService.removeTask(removableTask).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== removableTask.id);
        this.closeEditTaskForm();
      },
      (error) => console.error('ERR:', error),
      () => this.loaderService.addRequestsInPending(-1)
    );
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
