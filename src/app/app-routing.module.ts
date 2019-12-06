import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogsComponent } from './logs/logs.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotesComponent } from './notes/notes.component';
import { LifestyleComponent } from './lifestyle/lifestyle.component';

const routes: Routes = [
  { path: '', redirectTo: '/logs', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'lifestyle', component: LifestyleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
