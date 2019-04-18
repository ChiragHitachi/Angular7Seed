import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  DashboardService
} from './dashboard.service'
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  Router
} from '@angular/router';

import {
  IEntity,
  EntityType
} from './dashboard.model';

import {
  takeWhile
} from 'rxjs/operators';
import {
  BreadCrumbService
} from '../core/bread-crumbs/bread-crumb.service';
import { CommonService } from '../core/helpers/common.service';

@Component({
  selector: 'eag-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  entityValue: IEntity;
  entityList: IEntity[] = [];
  entityType: EntityType = EntityType.BusinessUnit;
  loginUserType = 'BU';
  isAlive: boolean = true;
  public dashboardForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private dashboardService: DashboardService,
    private crumbService: BreadCrumbService) {}

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    this.commonService.SetSpinnerStatus(true);

    this.crumbService.InitializeWithDashboard();
    this.dashboardForm = this.formBuilder.group({
      entities: [''],
      selectedEntity: ['']
    });

  

    
  }
  getBUdata() {
    
    this.dashboardService.getBuList()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(result => {
      
        if (result && result.data) {
          result.data.forEach(element => {
            const entity: IEntity = {
              entityId:  element.buName,
              entityValue: element.buName
            };
            this.entityList.push(entity);
          });

          this.dashboardForm.setValue({
            entities: this.entityList,
            selectedEntity: this.dashboardService.entityValue && this.dashboardService.entityValue.entityId ?
              this.dashboardService.entityValue.entityId : ''
          });
          if (this.dashboardService.entityValue) {
            this.entityValue = this.dashboardService.entityValue;
          }
          this.commonService.SetSpinnerStatus(false);

        }
      });
  }
  onSelectedValue(selectedValue) {
    const item = this.entityList.filter((e) => e.entityId == selectedValue);
    if (item && item.length > 0) {
      this.dashboardService.entityType = this.entityType;
      this.dashboardService.currentType = this.entityType;
      this.entityValue = item[0];
      this.dashboardService.currentValue = this.entityValue;
      this.crumbService.setCrumbEntity('Dashboard', this.dashboardService.currentValue);
      //this.dashboardService.setEntityValue(this.entityValue);
    }
  }
 
}
