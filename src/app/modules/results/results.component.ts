import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Joke, JokeQueryResult } from 'src/app/shared/models/joke.model';
import { JokeService } from 'src/app/shared/services/jokes.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public jokesList: Joke[];
  public searchQuery: string;
  public showLoading: boolean = false;

  private subscriptionDestroyer: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jokeService: JokeService,
    private _snackBar: MatSnackBar
  ) {
    this.checkIfRouterHasData();
  }

  public ngOnInit(): void {
    this.verifyQueryAndGetJokes();
    this.listenToRouteParamChange();
  }

  /**
   * Check if router has data and init jokesList
   *
   * @private
   * @memberof ResultsComponent
   */
  private checkIfRouterHasData(): void {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.jokesList = this.router.getCurrentNavigation()?.extras.state?.data.result;
    }
  }

  /**
   * Listen to route changes and request data
   *
   * @private
   * @memberof ResultsComponent
   */
  private listenToRouteParamChange(): void {
    this.router.events
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.verifyQueryAndGetJokes();
        }
      });
  }

  /**
   * Verify if orderId exists and get then get chat
   *
   * @private
   * @memberof ResultsComponent
   */
  private verifyQueryAndGetJokes(): void {
    this.searchQuery = this.activatedRoute.snapshot.params.query;

    if (this.searchQuery && !this.jokesList) {
      this.searchJokes();
    }
  }

  /**
   * Get jokes with the given query
   *
   * @memberof ResultsComponent
   */
  private searchJokes(): void {
    this.showLoading = true;
    this.jokeService.getJokesWithQuery(this.searchQuery)
      .pipe(takeUntil(this.subscriptionDestroyer))
      .subscribe(
        (data: JokeQueryResult) => {
          this.showLoading = false;
          this.jokesList = data.result;
        },
        (err) => {
          this.displayRequestError(err);
          this.showLoading = false;

        }
      )
  }

  /**
   * Show snackbar with the given error
   *
   * @private
   * @param {*} err
   * @memberof ResultsComponent
   */
  private displayRequestError(err: any): void {
    this._snackBar.open(`Error: ${err.error.message}`, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
