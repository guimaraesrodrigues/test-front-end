import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FactsService } from '../services/facts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public searchQuery: string = 'snake';
  private subscriptionDestroyer: Subject<any> = new Subject();

  constructor(
    private factsService: FactsService
  ) { }

  public ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  /**
   *
   *
   * @memberof HomeComponent
   */
  public searchJokes(): void {
    this.factsService.getFactsWithQuery(this.searchQuery)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe(
          (data) => {
            console.log('total  ', data.total)
            console.log('result  ', data.result)
          },
          (err) => {
            console.log('erro ', err.error.message)
          }
        )
  }
}
