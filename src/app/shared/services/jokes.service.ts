import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Joke, JokeQueryResult } from '../models/joke.model';
import { APIUrls } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Retrieve jokes with the given query
   *
   * @param {string} query
   * @returns {Observable<FactQueryResult>}
   * @memberof JokesService
   */
  public getFactsWithQuery(query: string): Observable<JokeQueryResult>{
    return this.http.get(APIUrls.FACTS.GET_WITH_QUERY(query));
  }

  /**
   * Get a random joke from API
   *
   * @returns {Observable<FactModel>}
   * @memberof JokesService
   */
  public getRandomFact(): Observable<Joke> {
    return this.http.get(APIUrls.FACTS.GET_RANDOM)
  }
}
