import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  ILoginUser
} from './login.model';
import {
  LoginService
} from './login.service';
import {
  AuthService
} from '../core/helpers/auth.service';
import {
  takeWhile
} from 'rxjs/operators';
import {
  MessageHandler
} from '../core/message/message.service';

@ Component({
  selector: 'eag-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  isLoading = false;
  public errFlag: boolean;
  isAlive = true;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private loginService: LoginService,
    private messageService: MessageHandler) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  public login(loginUser: ILoginUser): void {
    this.isLoading = true;
    this.errFlag = false;
    const servieId = 'PR';
    let rotationAmount = 0;
    this.loginService.login(loginUser, servieId)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((result) => {

        if (result) {
          if (result.access_token) {
            this.authService.setToken(result.access_token)
            this.authService.setIsAuth(true);
          }
          this.isLoading = false;

          this.router.navigate(['dashboard']);
        }
      }, error => {
        this.errFlag = true;
        this.isLoading = false;
      });
  }

}
