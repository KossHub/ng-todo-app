import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum TaskMarksEnum {
  noMark,
  low,
  medium,
  high
}

export interface ITask {
  id?: string;
  date?: string;
  lType: string;
  content: string;
  mark: TaskMarksEnum;
  inProgress: boolean;
  isDone: boolean;
}

interface ICreateResponse {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class LogsTasksService {
  static baseUrl = 'https://ng-todo-app-63874.firebaseio.com/tasks';

  public activeNewTaskForm: string = '';
  public activeEditTaskForm: string = '';
  public taskToMigrate: ITask;
  public migrateTo: string;

  constructor(private http: HttpClient) {}

  getTasks(date: string, lType: string): Observable<ITask[]> {
    const url = `${LogsTasksService.baseUrl}/${lType}/${date}.json`;
    return this.http
      .get<ITask[]>(url)
      .pipe(map((tasks) => {
        if (!tasks) {
          return [];
        }
        return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
      }));
  }

  createTask(task: ITask): Observable<ITask> {
    const url = `${LogsTasksService.baseUrl}/${task.lType}/${task.date}.json`;
    return this.http
      .post<ICreateResponse>(url, task)
      .pipe(map((response) => {
        return { ...task, id: response.name };
      }));
  }

  editTask(task: ITask) {
    const { lType, date, id } = task;
    const url = `${LogsTasksService.baseUrl}/${lType}/${date}/${id}.json`;
    return this.http.put<ITask>(url, task);
  }

  removeTask({ lType, date, id }: ITask): Observable<void> {
    const url = `${LogsTasksService.baseUrl}/${lType}/${date}/${id}.json`;
    return this.http.delete<void>(url);
  }

  setActiveNewTaskForm(lType: string = ''): void {
    this.activeNewTaskForm = lType;
    this.activeEditTaskForm = null;
  }

  setActiveEditTaskForm(id: string = ''): void {
    this.activeEditTaskForm = id;
    this.activeNewTaskForm = null;
  }

  setTaskToMigrate(task: ITask, newLogType: string): void {
    this.taskToMigrate = task;
    this.migrateTo = newLogType;
  }

  migrateTask(date: string): void {
    this.removeTask(this.taskToMigrate).subscribe(
      () => {
        const migratedTask = {
          ...this.taskToMigrate,
          date,
          lType: this.migrateTo
        };
        this.createTask(migratedTask).subscribe((task) => {
          /** MIGRATE DONE => UPDATE TASKS */
        });
      },
      (error) => console.error('ERR:', error)
    );
  }
}
