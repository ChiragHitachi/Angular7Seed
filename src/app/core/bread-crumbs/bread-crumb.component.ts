import {
  SimpleChanges,
  Component,
  OnChanges,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  IBreadCrumb
} from '../core.model';
import {
  Router
} from '@angular/router';
import { BreadCrumbService } from './bread-crumb.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'eag-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']

})

export class BreadCrumbComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public title: string;
  isAlive = true;
  hasAccount = false;
  hasProject = false;
  accountName = '';
  projectName = '';

  public crumbs: IBreadCrumb[] = [];

  constructor(private router: Router, private crumbService: BreadCrumbService ) {}
  ngOnInit() {
      // this.crumbService.crumbsSubject
      // .subscribe((result: any) => {
      //   this.crumbs = result;
      // });
    this.crumbs = this.crumbService.crumbs;
    this.crumbs.forEach(element => {
      if(element.path === 'Account' && element.entity && element.entity.entityValue && element.entity.entityValue.length > 0){
         this.hasAccount = true;
         this.accountName =  element.entity.entityValue;
      }
      if(element.path === 'Projects' && element.entity && element.entity.entityValue && element.entity.entityValue.length > 0){
        this.hasProject = true;
        this.projectName =  element.entity.entityValue;
     }
    });
  }
  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  public moveToRoute(index, item) {
    if (index !== this.crumbs.length - 1) {
      this.crumbService.removeCrumbsAfter(item.path)
      .subscribe((res)=> {
        if(res){
        this.router.navigate([item.route]);
        }
      });
    }
  }
}
