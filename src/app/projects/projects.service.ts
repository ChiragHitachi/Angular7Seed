import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of ,
  observable
} from 'rxjs';

import {
  IProject,
} from './projects.model';

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
export class ProjectsService {
  public projectId: number;
  public accountId: number;
  private webApiBaseUrl = environment.baseServerUrl;
  constructor(private httpClient: HttpClient,
    private webRequest: WebRequest) {}
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

  public getProjectDetails(entityType, entityValue): Observable < IProject[] > {
    return this.webRequest.get < any >
      (this.webApiBaseUrl + `/Project/GetProjectsForDashboard?EntityType=${entityType}&&EntityValue=${entityValue}`);
  }
  
}
