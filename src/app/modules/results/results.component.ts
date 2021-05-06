import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Joke, JokeQueryResult } from 'src/app/shared/models/joke.model';

import { JokeService } from 'src/app/shared/services/jokes.service';
import { JokeDialogComponent } from './joke-dialog/joke-dialog.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {

  public jokesList: Joke[];
  public searchQuery: string;
  public showLoading: boolean = false;

  private subscriptionDestroyer: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jokeService: JokeService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.checkIfRouterHasData();
  }

  /**
   * Check if needs to get jokes from api when component initialize
   *
   * @memberof ResultsComponent
   */
  public ngOnInit(): void {
    this.verifyQueryAndGetJokes();
  }

  /**
   * Unsubscribe from all Obaervers on component destroy
   *
   * @memberof ResultsComponent
   */
   public ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  /**
   * Navigate to home page
   *
   * @memberof ResultsComponent
   */
  public goBackToHome(): void {
    this.router.navigate(['']);
  }

  /**
   * Create span element with text highlighted
   *
   * @param {string} value
   * @returns {string}
   * @memberof ResultsComponent
   */
  public highlight(value: string): string {
    if(!this.searchQuery) {
        return value;
    }
    return value.replace(new RegExp(this.searchQuery, "gi"), match => {
        return ' <span class="highlightText">' + match + '</span> ';
    });
  }

  /**
   *
   *
   * @memberof ResultsComponent
   */
  private openJokeDialog(): void {
    const randomJoke =  this.jokesList[Math.floor(Math.random()*this.jokesList.length)];
    this.dialog.open(JokeDialogComponent, {
      width: '400px',
      data: {joke: randomJoke}
    });
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
      
      if(this.router.getCurrentNavigation()?.extras.state?.feelingLucky) {
        this.openJokeDialog();
      }
    }
  }

  /**
   * Verify if url has search query and jokesList not initialized
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
