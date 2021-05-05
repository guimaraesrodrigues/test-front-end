import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { JokeQueryResult } from '../../shared/models/joke.model';
import { JokeService } from '../../shared/services/jokes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  public searchQuery: string = '';
  public showLoading: boolean = false;
  private subscriptionDestroyer: Subject<any> = new Subject();

  constructor(
    private factsService: JokeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  public ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  /**
   * Get jokes with the given query
   *
   * @memberof HomeComponent
   */
  public searchJokes(): void {
    this.showLoading = true;
    this.factsService.getFactsWithQuery(this.searchQuery)
        .pipe(takeUntil(this.subscriptionDestroyer))
        .subscribe(
          (data: JokeQueryResult) => {
            this.showLoading = false;
            this.navigateToResults(data);
          },
          (err) => {
            this.displayRequestError(err);
            this.showLoading = false;
  
          }
        )
  }

  /**
   * Change to results page
   *
   * @private
   * @param {FactQueryResult} result
   * @memberof HomeComponent
   */
  private navigateToResults(result: JokeQueryResult): void {
    this.router.navigate([`/results`, { query: this.searchQuery}], { state: {data: result}});
  }

  /**
   * Show snackbar with the given error
   *
   * @private
   * @param {*} err
   * @memberof HomeComponent
   */
  private displayRequestError(err: any): void {
    this._snackBar.open(`Error: ${err.error.message}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
