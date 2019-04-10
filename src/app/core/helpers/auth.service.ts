import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { IRole, IFunctions } from './helper.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  private token: string;
  public authStatusListener = new Subject<boolean>();
  public roles: IRole[] = [];
  public functions: IFunctions[] = [];

  constructor(private router: Router) {}

  logout(){
      this.setIsAuth(false);
      this.token = null;
      this.roles = [];
      this.functions = [];
  }
  getToken(): any {
    return this.token;
  }
  setToken(token : string): any {
    this.token = token;
  }
  setIsAuth(value : boolean) {
    this.isAuthenticated = value;
    this.authStatusListener.next(this.isAuthenticated);
  }

  canAccess(funtionName: string){
    const filteredFunctions = this.functions.filter((res) => res.funtionName === funtionName);
    if(filteredFunctions){
      // filteredFunctions.forEach(element => {
      //   const matchRole = this.roles.find((role) => role.roleName === element.roleName);
      //   if(matchRole){
      //     return true;
      //   }
      // });
      return true;
    }
    else{
      return true; // to make it false on getting auth data
    }
  }
}
