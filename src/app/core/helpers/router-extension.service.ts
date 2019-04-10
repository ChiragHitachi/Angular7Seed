import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterExtensionService {
  public previousUrl: string = undefined;
  public currentUrl: string = undefined;

  constructor(private router : Router) {
    this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
    )
    .subscribe((event: any[]) => {
        this.previousUrl = event[0].urlAfterRedirects;
        this.currentUrl = this.router.url;
    });

  }
}
