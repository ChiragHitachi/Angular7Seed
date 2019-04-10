import {
  Injectable,
  Inject
} from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpRequest,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  CommonService
} from './helpers/common.service';
import {
  map,
  takeUntil
} from 'rxjs/operators';



@Injectable()
export class WebRequest {
  // patch: <T> (url: string, data ?: any, header ?: any, goToErrorState ?: boolean) => Observable <T>> ;
  get: <T> (url: string, data ?: any, header ?: any, showLoader ?: boolean) => Observable <T> ;
  post: <T> (url: string, data ?: any, header ?: any, showLoader ?: boolean) => Observable <T> ;
  put: <T> (url: string, data ?: any, header ?: any) => Observable <T> ;
  delete: <T> (url: string, data ?: any, header ?: any) => Observable <T> ;
  download: <T> (url: string, data ?: any, header ?: any) => Observable < Blob > ;

  constructor(private http: HttpClient, private commonService: CommonService) {
    const vm = this;

    vm.get = <T> (url: string, data ?: any, header ?: any) => {
      const options = vm.getRequestOption('get', url, data, header ? header : vm.commonService.getRequestHeader());
      return vm.http.get<T>(url, options);
    };

    vm.post = <T> (url: string, data ?: any, header ?: any) => {
      const options = vm.getRequestOption('post', url, data, header ? header : vm.commonService.getRequestHeader());
      return vm.http.post<T>(url, data, options);
    };

    vm.put = <T> (url: string, data ?: any, header ?: any) => {
      const options = vm.getRequestOption('put', url, data, header ? header : vm.commonService.getRequestHeader());
      return vm.http.put<T>(url, data, options);
    };

    vm.download = <T> (url: string, data ?: any, header ?: any) => {
      const httpParams = new HttpParams();
      const options = {
        headers: new Headers({
          'response-type': 'blob'
        }),
        responseType: 'blob',
        accepts: 'application/pdf',
        params: httpParams
      };
      const opts = Object.assign({}, options, null);

      return this.http.get(url, opts).pipe(
        map((res) => {
          return new Blob([res], {
            type: 'application/pdf'
          });
        }));
    };

    vm.delete = <T> (url: string, data ?: any, header ?: any) => {
      const options = vm.getRequestOption('delete', url, data, header ? header : vm.commonService.getRequestHeader());
      return vm.http.delete <T> (url, options);
    };
  }
  private genParams(params: object, httpParams = new HttpParams()): object {
    Object.keys(params)
      .filter(key => {
        let v = params[key];
        return (Array.isArray(v) || typeof v === 'string') ?
          (v.length > 0) :
          (v !== null && v !== undefined);
      })
      .forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });

    return {
      params: httpParams
    };
  }

  private getRequestOption(method: any, url: string, data ?: any, header ?: any) {
    const httpParams = new HttpParams();
    const options = {
      headers: header,
      // observe: method === "get" ? "search" : "body",
      responseType: 'json',
      params: httpParams
    };
    const opts = Object.assign({}, options, method === 'get' && data ? this.genParams(data, options.params) : null);
    return opts;
  }


}
