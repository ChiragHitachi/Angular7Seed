import {
  ProjectsComponent
} from './projects.component';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';
import {
  CommonModule
} from '@angular/common';
import {
  ProjectsService
} from './projects.service';
import {
  TableModule
} from 'primeng/table';
import {
  AppModule
} from '../app.module';
import {
  CoreModule
} from '../core/core.module';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

const routes = [{
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'create-project/:accountId',
    component: ProjectsComponent,
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
  declarations: [ProjectsComponent],
  providers: []
})


export class ProjectsModule {}
