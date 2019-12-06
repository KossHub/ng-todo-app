import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgDatepickerModule } from 'ng2-datepicker';
import { ClickOutsideModule } from 'ng-click-outside';
import { AppRoutingModule } from './app-routing.module';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { ClickStopPropagation } from './shared/directives/click-stop-propagation.directive';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';
import { LogsComponent } from './logs/logs.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectsComponent } from './projects/projects.component';
import { LogsDatepickerComponent } from './logs/logs-datepicker/logs-datepicker.component';
import { TasksScrollbarComponent } from './logs/tasks-scrollbar/tasks-scrollbar.component';
import { TaskComponent } from './logs/task/task.component';
import { NewTaskFormComponent } from './logs/new-task-form/new-task-form.component';
import { TasksContainerComponent } from './logs/tasks-container/tasks-container.component';
import { MarkTaskBtnComponent } from './logs/mark-task-btn/mark-task-btn.component';
import { EditTaskFormComponent } from './logs/edit-task-form/edit-task-form.component';
import { MigrateDatepickerComponent } from './logs/migrate-datepicker/migrate-datepicker.component';
import { LoaderComponent } from './loader/loader.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    MomentPipe,
    HeaderComponent,
    LifestyleComponent,
    LogsComponent,
    NotesComponent,
    ProjectsComponent,
    LogsDatepickerComponent,
    TasksScrollbarComponent,
    TaskComponent,
    NewTaskFormComponent,
    TasksContainerComponent,
    MarkTaskBtnComponent,
    EditTaskFormComponent,
    MigrateDatepickerComponent,
    ClickStopPropagation,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgDatepickerModule,
    ClickOutsideModule,
    PerfectScrollbarModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
