import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  IProject 
} from './projects.model';
import {
  ProjectsService
} from './projects.service';
import {
  DashboardService
} from '../dashboard/dashboard.service';
import {
  EntityType, IEntity
} from '../dashboard/dashboard.model';
import {
  IBreadCrumb
} from '../core/core.model';
import {
  RoutesRecognized,
  Router
} from '@angular/router';
import {
  filter,
  pairwise,
  takeWhile
} from 'rxjs/operators';
import {
  RouterExtensionService
} from '../core/helpers/router-extension.service';
import { CommonService } from '../core/helpers/common.service';
import { BreadCrumbService } from '../core/bread-crumbs/bread-crumb.service';


@Component({
  selector: 'eag-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  title = 'Projects';
  private isAlive = true;
  listOfCount: any = { acc_count: 1, projects_count: 1 };
  showProjects = true;
  showAccount= true;
  billableNonBillableCount = { billable: 1, nonBillable:0 };
  revenueCostCount = { sowAmountSum: 1, costAmountSum: 1};
  constructor(private projectService: ProjectsService,
              private routerExtensionService: RouterExtensionService,
              private dashboardService: DashboardService,
              private commonService: CommonService,
              private crumbService: BreadCrumbService,
              private router: Router) {

  }
  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    this.commonService.SetSpinnerStatus(true);
    this.crumbService.addCrumb({
      path: 'Projects',
      route: '/projects',
      entity: {
        entityId: '',
        entityValue : ''
      }
    });
  }


}
