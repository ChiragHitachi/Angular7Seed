import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  CommonService
} from 'src/app/core/helpers/common.service';
 
import {
  FormGroup,
  FormBuilder,
  FormControlName,
  FormArray
} from '@angular/forms';
import {
  DashboardService
} from 'src/app/dashboard/dashboard.service';
import {
  IResourceReconciliation
} from '../resources.model';
import * as moment from 'moment';
import {
  MessageHandler
} from 'src/app/core/message/message.service';
import {
  BreadCrumbService
} from 'src/app/core/bread-crumbs/bread-crumb.service';
import {
  takeWhile
} from 'rxjs/operators';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'resource-reconciliation-resource',
  templateUrl: './resource-reconciliation.component.html'

})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Reconciliation';
  isAlive = true;
  showSpinner = true;
  public isLoggedIn: boolean;
  resourceID: any;
  accountID: any;
  source: any
  reconciliationInfo: any[] = [];
  public reconciliationForm: FormGroup;
  cols: any[];
  masterListPowerOf3: any[] = [];
  masterListStack: any[] = [];
  masterListStatus: any[] = [];
  masterListSubStatus: any[] = [];
  masterListFinancial: any[] = [];
  constructor(private activateRoute: ActivatedRoute,
    private commonService: CommonService,
    private resourceService: HomeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private crumbService: BreadCrumbService,
    private dashboardService: DashboardService,
    private messageService: MessageHandler) { }

  createItem(info?: any): FormGroup {
    if (info) {
      return this.formBuilder.group({
        id: [info.id],
        accountID: [this.accountID],
        projectID: [info.projectID],
        resourceID: [info.resourceID],
        resourceName: [info.resourceName],
        projectName: [info.projectName],
        powerOf3: [info.powerOf3],
        stack: [info.stack],
        status: [info.status],
        accAllocationDate: [info.accAllocationDate ? info.accAllocationDate : ''],
        accReleaseDate: [info.accReleaseDate ? info.accReleaseDate : ''],
        projAllocationDate: [moment(info.projAllocationDate).format('YYYY-MM-DD')],
        projReleaseDate: [moment(info.projReleaseDate).format('YYYY-MM-DD')],
        utilizationPercent: [info.utilizationPercent],
        sub_Status: [info.sub_Status],
        financialStatus: [info.financialStatus],
        ProjAllocationDateString: [moment(info.projAllocationDate).format('YYYY-MM-DD')],
        ProjReleaseDateString: [moment(info.projReleaseDate).format('YYYY-MM-DD')],
        AccReleaseDate: [''],
        Feedback: [''],
        Rating: ['']
      });
    } else {
      return this.formBuilder.group({
        accountID: [this.accountID],
        projectID: [''],
        resourceID: [''],
        resourceName: [''],
        projectName: [''],
        powerOf3: [''],
        stack: [''],
        status: [''],
        accAllocationDate: [''],
        accReleaseDate: [''],
        projAllocationDate: [''],
        projReleaseDate: [''],
        utilizationPercent: [''],
        sub_Status: [''],
        financialStatus: [''],
        ProjAllocationDateString: [''],
        ProjReleaseDateString: [''],
        AccReleaseDate: [''],
        Feedback: [''],
        Rating: ['']
      });
    }
  }
  ngOnInit() {

    this.reconciliationForm = this.formBuilder.group({
      resourceID: [''],
      resourceName: [''],
      items: this.formBuilder.array([])
    });
    this.commonService.SetSpinnerStatus(true);
    const vm = this;
    this.activateRoute.queryParams
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((queryparams: Params) => {

        vm.accountID = queryparams['accountid'];
        vm.resourceID = queryparams['resourceid'];
        vm.source = queryparams['source'];
        vm.title = queryparams['title'];
        vm.crumbService.addCrumb({
          path: this.title,
          route: this.router.url,
          entity: {
            entityId: '',
            entityValue: ''
          }
        });

        vm.getReconciliation(this.accountID, this.resourceID);
      })

    this.cols = [{
      field: 'projectName',
      header: 'Project Name'
    },
    {
      field: 'projAllocationDate',
      header: 'Start Date'
    },
    {
      field: 'projReleaseDate',
      header: 'End Date'
    },
    {
      field: 'utilizationPercent',
      header: 'Util %'
    },
    {
      field: 'powerOf3',
      header: 'Power Of 3'
    },
    {
      field: 'stack',
      header: 'Stack'
    },
    {
      field: 'status',
      header: 'Status'
    },
    {
      field: 'sub_Status',
      header: 'Sub Status'
    },
    {
      field: 'financialStatus',
      header: 'Financial Staus'
    }
    ];
    this.getPowerOf3MasterList();
    this.getStackMasterList();
    this.getStatusMasterList();
    this.getSubStatusMasterList();
    this.getFinancialStatusMasterList();
  }
  onSave(item, i) {
    this.reconciliationInfo[i].powerOf3 = item.powerOf3;
    this.reconciliationInfo[i].stack = item.stack;
    this.reconciliationInfo[i].status = item.status;
    this.reconciliationInfo[i].sub_Status = item.sub_Status;
    this.reconciliationInfo[i].financialStatus = item.financialStatus;
    this.reconciliationInfo[i].utilizationPercent = item.utilizationPercent;
    this.reconciliationInfo[i].projAllocationDate = item.projAllocationDate;
    this.reconciliationInfo[i].projReleaseDate = item.projReleaseDate;
  }
  saveResource(item) {
    if (this.title === 'Reconciliation') {
      //this.resourceService.post(item)
      //  .pipe(takeWhile(() => this.isAlive))
      //  .subscribe((res: any) => {
      //    if (res && res.data && res.data.result && res.data.result.statusCode === 200) {
      //      this.messageService.setSuccess('Saved Successfully');
      //    } else {
      //      this.messageService.setFailure('Error occured');
      //    }
      //  });
    }  
  }
  getFinancialStatusMasterList() {
    
  }
  getStatusMasterList() {
    
  }
  getSubStatusMasterList() {
    
  }
  getPowerOf3MasterList() {
     
  }
  getStackMasterList() {
    
  }


  addItem(info): void {
    const items = this.reconciliationForm.get('items') as FormArray;
    items.push(this.createItem(info));
  }

  getReconciliation(accountID, resourceID) {
    //this.resourceService.get(accountID, resourceID)
    //  .pipe(takeWhile(() => this.isAlive))
    //  .subscribe((result: any) => {
    //    if (result && result.data && result.data.accountProjectResource) {
    //      this.reconciliationInfo = result.data.accountProjectResource;
    //      this.reconciliationInfo.forEach(element => {
    //        this.addItem(element);
    //      });
    //      this.commonService.SetSpinnerStatus(false);
    //    }
    //  })  
  }

  onSelectedValue(data) {

  }
  ngOnDestroy() {
    this.isAlive = false;
  }
  public Cancel() {
    this.router.navigate([this.crumbService.goPrevious()]);
  }

}
