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
  public getJokesWithQuery(query: string): Observable<JokeQueryResult>{
    return this.http.get(APIUrls.JOKES.GET_WITH_QUERY(query));
  }
}
