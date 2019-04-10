import { Injectable } from '@angular/core';
import { ILoginDetail } from './login.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebRequest } from '../core/web.request';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class LoginService  {

  private webApiBaseUrl = environment.baseServerUrl;
  private authServiceUrl = environment.authServerURl;
  //public securityServerURL=environment.securityServerURL;
  constructor(private http: HttpClient,private webRequest:WebRequest){
  }

  // postServiceBaseCallWithParams<T>(Url:string,data = {}){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'my-auth-token' });
  //   let options = { headers: headers };
  //   return this.http.post<T>(`${this.securityServerURL}/${Url}`,data,options)
  // }



  login(loginUser,serviceId): Observable<any>{

    const payload = new HttpParams()
    .set('username', loginUser.userName)
    .set('password', loginUser.password)
    .set('grant_type', 'password');
  
    return this.http.post(this.authServiceUrl,payload);

    //return this.webRequest.post<any>(this.authServiceUrl,payload);
  //return this.postServiceBaseCallWithParams<any>(`Authentication/Authenticate?appServiceId=${serviceId}`,loginUser);
  }

}
