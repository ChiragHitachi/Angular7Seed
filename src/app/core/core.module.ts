import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './charts/pie/pie.component';
import { StackBarChartComponent } from './charts/stack-bar/stack-bar.component';
import { BreadCrumbComponent } from './bread-crumbs/bread-crumb.component';
import { MessageComponent } from './message/message.component';
import { ToastModule } from 'primeng/toast';
import { WebRequest } from './web.request';
import { AuthGuard } from './guard/auth.guard';
import { LogingService } from './helpers/loging.service';
import { CommonService } from './helpers/common.service';
import { AuthDirective } from './helpers/auth.directive';
import { RouterExtensionService } from './helpers/router-extension.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PolarAreaChartComponent } from './charts/polar-area/polar-area.component';
import { DoughnutChartComponent } from './charts/doughnut/doughnut.component';
import { LineChartComponent } from './charts/line/line-chart.component';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastModule,
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [
    PieChartComponent,
    StackBarChartComponent,
    BreadCrumbComponent,
    MessageComponent,
    AuthDirective,
    PolarAreaChartComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  exports:[
    PieChartComponent,
    StackBarChartComponent,
    BreadCrumbComponent,
    MessageComponent,
    AuthDirective,
    PolarAreaChartComponent,
    DoughnutChartComponent,
    LineChartComponent
  ],
  providers: [AuthGuard]
})


export class CoreModule {}
