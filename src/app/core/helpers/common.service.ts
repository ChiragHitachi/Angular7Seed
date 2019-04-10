import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private showSpinner: boolean = false;
  public spinnerSubject = new Subject<boolean>();
  constructor(private authService: AuthService) {

  }
  getRevenueCostCss(sowAmountSum, costAmountSum){
    if(sowAmountSum == 0 &&  costAmountSum == 0){
      return 'dataBlack';
    } else
    if(sowAmountSum < costAmountSum){
      return 'dataRed';
    }
    else {
        const diff = (sowAmountSum - costAmountSum) * 100 / (costAmountSum > 0 ? costAmountSum: 1);
        if(diff >= 20){
          return 'dataGreen';
        } else if(diff > 10 && diff < 20){
          return 'dataAmber';
        }
        else {
          return 'dataRed';
        }
    }
  }
  getBillabilityCss(billable, nonBillable){
    if(billable == 0 &&  nonBillable == 0){
      return 'dataBlack';
    } else
    if(billable < nonBillable){
      return 'dataRed';
    }
    else
    if(nonBillable === 0){
      return 'dataGreen';
    }
    else{
        const diff = (billable - nonBillable) * 100 / nonBillable;
        if(diff >= 90){
          return 'dataGreen';
        } else if(diff > 80  && diff < 90){
          return 'dataAmber';
        }
        else {
          return 'dataRed';
        }
    }
  }
  public showErrorMessage(err: any): boolean {
    //TO DO prepare framework for showing error.
    return true;
  }
  public SetSpinnerStatus(flag : boolean){
    this.showSpinner = flag;
    this.spinnerSubject.next(this.showSpinner);
  }
  public getRequestHeader = () => {
    const token = this.authService.getToken();
    let header = new HttpHeaders
    ({ Accept:'application/json',
      'Content-Type':'application/json',
      'Cache-Control':'no-cache',
      Pragma:'no-cache',
      Authorization: 'Bearer ' + token});
    // header.set('Accept', 'application/json');
    // header.set('Content-Type', 'application/json');
    // header.set('Cache-Control', 'no-cache');
    // header.set('Pragma', 'no-cache');
    // //const token = this.authService.getToken();
    // if (token && token.length > 0) {
    //   header.set('Authorization', 'Bearer ' + token);
    // }
    return header;
  }
}
