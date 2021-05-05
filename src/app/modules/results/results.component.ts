import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joke } from 'src/app/shared/models/joke.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public jokesList: Joke[];

  constructor(
    private router: Router
  ) { 
    this.checkIfRouterHasData();
  }

  ngOnInit(): void {
    
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

}
