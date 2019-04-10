import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../../environments/environment';
import {
  AuthService
} from './auth.service';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  retry,
  catchError
} from 'rxjs/operators';
import {
  LogingService
} from './loging.service';
import {
  Router
} from '@angular/router';

@ Injectable()
export class AuthInterceptor implements HttpInterceptor {
  url = '';
  constructor(private authService: AuthService, private router: Router,
    private http: HttpClient, private logingService: LogingService) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): any {
    this.url = req.url;
    const authToken = this.authService.getToken();
    let authRequest: any;
    if (authToken !== undefined) {
      authRequest = req.clone({
        //headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        // headers: req.headers.set('Cache-Control', 'no-cache')
      });
      // return next.handle(authRequest);
    } else {
      authRequest = req.clone({
        headers: req.headers.set('Cache-Control', 'no-cache')
      });
      // return next.handle(authRequest);
    }
    return next.handle(authRequest).pipe(

      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client Error: ${error.error.message}`;
          this.logingService.addToLog('Error', errorMessage, this.url);
        } else  if (error.error && error.error.exceptionMessage &&
            error.error.exceptionMessage === 'Error fetching user details. Please try to login again') {
            // would prefer error code check instead
              errorMessage = error.error.exceptionMessage;
              this.logingService.addToLog('Error', errorMessage, this.url);
              this.authService.logout();
              this.router.navigate(['/login']);
        } else { // server-side error
          errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
          this.logingService.addToLog('Error', errorMessage, this.url);
        }
        return throwError(errorMessage);
      })
    )
  }


  saveLogs(errorMessage: string, url: string) {
    this.logingService.addToLog('Error', errorMessage, url);

  }
}
