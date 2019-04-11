import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of,
  observable
} from 'rxjs';
import {
  HttpClientModule,
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import {
  WebRequest
} from '../core/web.request';
import {
  environment
} from 'src/environments/environment';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  IEntity
} from '../dashboard/dashboard.model';

@Injectable()
export class HomeService {
  public projectId: number;
  public accountId: number;
  private webApiBaseUrl = environment.baseServerUrl;
  constructor(private httpClient: HttpClient,
    private webRequest: WebRequest) { }
  /*
    public getProjectDetails(): Observable<IProjectDetail[]> {
      let projectDetails: IProjectDetail[] = [{
        projectId: 1,
        projectName: 'Project A',
        resourceCount: 3
      },
      {
        projectId: 12,
        projectName: 'Project B',
        resourceCount: 11
      },
      {
        projectId: 31,
        projectName: 'Project C',
        resourceCount: 6
      },
      ];

      return of(projectDetails);
    }
  <<<<<<< .mine
  ||||||| .r330

  =======
  */

  public post(item) {
    return this.webRequest.post<any>(this.webApiBaseUrl + `/Reconcile`, item);
  }

}
