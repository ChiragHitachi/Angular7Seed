import {
  Injectable
} from '@angular/core';
import {
  IBreadCrumb
} from '../core.model';
import {
  Subject,
  Observable,
  of
} from 'rxjs';
import {
  DashboardService
} from 'src/app/dashboard/dashboard.service';
import {
  IEntity,
  EntityType
} from 'src/app/dashboard/dashboard.model';
import {
  element
} from 'protractor';

@Injectable()
export class BreadCrumbService {

  public crumbs: IBreadCrumb[] = [];
  public crumbsSubject = new Subject < IBreadCrumb[] > ();
  constructor(private dashboardService: DashboardService) {}
  public InitializeWithDashboard() {
    this.crumbs = [{
      path: 'Dashboard',
      route: '/dashboard',
      entity: this.dashboardService.entityValue
    }];
    this.crumbsSubject.next(this.crumbs);

  }
  public setCrumbEntity(path: string, entity: IEntity) {
    this.crumbs.forEach((c) => {
      if (c.path === path) {
        c.entity = entity;
      }
    });
  }

  public findCrumb(path: string): IBreadCrumb {
    const el = this.crumbs.filter(e => e.path === path);
    if (el && el.length > 0) {
      return el[0];
    }
    return null;
  }
  public getCrumbs(): Observable < any > {
    return this.crumbsSubject.asObservable();
  }
  public clearAllCrumbs() {
    this.crumbs = [];
    this.crumbsSubject.next(this.crumbs);

  }
  public addCrumb(crumb: IBreadCrumb) {
    const exists = this.crumbs.filter((e) =>
      e.path === crumb.path
    );
    if (exists.length === 0) {
      this.crumbs.push(crumb);
      this.crumbsSubject.next(this.crumbs);
    } else {
      exists[0].entity = crumb.entity;
      exists[0].route = crumb.route;
    }
  }
  public goPrevious() : string{
    const len = this.crumbs.length;
    const lastCrumbRoute = this.crumbs[len - 2].route;
    this.crumbs.pop();
    return lastCrumbRoute;
  }
  public removeCrumbsAfter(path: string): Observable < boolean > {
    let tempCrumbs: IBreadCrumb[] = [];
    let matched: boolean;
    let oldElement: IBreadCrumb;
    this.crumbs.forEach(e => {

      if (e.path === path) {
        matched = true;
        this.dashboardService.currentValue = oldElement ? oldElement.entity : e.entity;
        const pathVal = oldElement ? oldElement.path : 'Dashboard';
        if (pathVal === 'Dashboard') {
          this.dashboardService.currentType = EntityType.BusinessUnit;
        } else
        if (pathVal === 'Account') {
          this.dashboardService.currentType = EntityType.Account;
        } else
        if (pathVal === 'Project') {
          this.dashboardService.currentType = EntityType.Projects;
        }
      }
      if (!matched) {
        tempCrumbs.push(e);
        if (e.path.indexOf('Summary') < 0) {
          oldElement = e;
        }
      }
    });
    this.crumbs = tempCrumbs;

    this.crumbsSubject.next(this.crumbs);
    return of(true);
  }

}
