import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor,
  HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Logging } from './helper.model';

@Injectable({
    providedIn: 'root'
})

export class LogingService {
    constructor(private http: HttpClient, private deviceService: DeviceDetectorService) {

    }

    addToLog(level: string, errorMessage: string, url: string) {
        const deviceInfo = this.deviceService.getDeviceInfo();

        let postData: Logging;
        postData = new Logging();
        postData.level = level;
        postData.task = '';
        postData.component = '';
        postData.api = url;
        postData.message = errorMessage;
        postData.description = errorMessage;
        postData.browser = deviceInfo.browser + ' ' + deviceInfo.browser_version;
        postData.device = deviceInfo.os + ' ' + deviceInfo.os_version;
        if ( url.indexOf('log') === -1) {
          console.log(postData); //TODO send data to API
        // this.http.post(ApiBaseUrl + 'log', postData, options)
        //     .subscribe((res: any) => {
        //         console.log('log saved !!' + res);
        //     }, err => {
        //         console.log('Error in saving log!!' + err);
        //     });
         }
    }
}
