import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  environment
} from '../environments/environment';
import {
  AuthService
} from './core/helpers/auth.service';
import {
  takeWhile
} from 'rxjs/operators';
import {
  RouterExtensionService
} from './core/helpers/router-extension.service';
import {
  CommonService
} from './core/helpers/common.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MessageHandler } from './core/message/message.service';
import { Message } from './core/core.model';
@Component({
  selector: 'eag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'EAG-Portal-V2';
  isAlive = true;
  showSpinner = true;
  public isLoggedIn: boolean;
  public showMessage = false;
  public message : Message;
  constructor(private authService: AuthService,
              private commonService: CommonService,
              private messageService: MessageHandler,
              private spinnerService: Ng4LoadingSpinnerService,
              private routerExtensionService: RouterExtensionService) {

  }
  ngOnDestroy() {
    this.isAlive = false;
  }
  ngOnInit() {
    const vm = this;

    this.messageService.getEntityValue()
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((msg) => {
      this.showMessage = true;
      this.message = msg;
      setTimeout(() => {vm.showMessage = false;}, 5000);
    });
    this.commonService.spinnerSubject
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        this.showSpinner = result;
        this.showSpinner ? this.spinnerService.show() : this.spinnerService.hide();
      });
    this.authService.authStatusListener
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {
        this.isLoggedIn = result;
      });
  }
}
