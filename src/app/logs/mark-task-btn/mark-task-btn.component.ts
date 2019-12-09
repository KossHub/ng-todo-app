import { Component, Output, EventEmitter } from '@angular/core';

import { TaskMarksEnum } from 'src/app/shared/services/logs/tasks.service';

@Component({
  selector: 'app-mark-task-btn',
  templateUrl: './mark-task-btn.component.html',
  styleUrls: ['./mark-task-btn.component.scss']
})
export class MarkTaskBtnComponent {
  @Output() markTask: EventEmitter<TaskMarksEnum> = new EventEmitter();
}
