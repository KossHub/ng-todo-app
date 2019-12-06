import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../shared/services/logs/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: ITask;

  constructor() { }

  ngOnInit() {
  }
}
