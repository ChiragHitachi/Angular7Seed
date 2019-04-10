import { Injectable } from '@angular/core';
import { WebRequest } from '../web.request';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SyncService {
  private webApiBaseUrl = environment.baseServerUrl;

  constructor(private webRequest: WebRequest) {

  }

  public SyncData(): Observable<any> {
    return this.webRequest.get < any >
      (this.webApiBaseUrl + `/Synchronization/SynchnorizeData`);

  }
}
