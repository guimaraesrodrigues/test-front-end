import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FactQueryResult } from '../../shared/models/fact.model';

import { FactsService } from '../../shared/services/facts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public searchQuery: string = '';
  private subscriptionDestroyer: Subject<any> = new Subject();

  constructor(
    private factsService: FactsService,
    private router: Router,
    private _snackBar: MatSnackBar
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
    // this.router.navigate(['results']);
    // this.router.navigateByUrl('results');
    // this.factsService.getFactsWithQuery(this.searchQuery)
    //     .pipe(takeUntil(this.subscriptionDestroyer))
    //     .subscribe(
    //       (data: FactQueryResult) => {

    //         this.navigateToResults(data);
    //       },
    //       (err) => {
    //         this._snackBar.open(`Error: ${err.error.message}`, 'Close', {
    //           horizontalPosition: 'right',
    //           verticalPosition: 'top',
    //           duration: 5000
    //         });
    //       }
    //     )
  }

  private navigateToResults(result: FactQueryResult): void {
    this.router.navigate(['results'], {state: result});
  }
}
