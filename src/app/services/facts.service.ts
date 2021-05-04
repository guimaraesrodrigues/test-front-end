import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FactModel, FactQueryResult } from '../models/fact.model';
import { APIUrls } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Retrieve facts with the given query
   *
   * @param {string} query
   * @returns {Observable<FactQueryResult>}
   * @memberof FactsService
   */
  public getFactsWithQuery(query: string): Observable<FactQueryResult>{
    return this.http.get(APIUrls.FACTS.GET_WITH_QUERY(query));
  }

  /**
   * Get a random fact from API
   *
   * @returns {Observable<FactModel>}
   * @memberof FactsService
   */
  public getRandomFact(): Observable<FactModel> {
    return this.http.get(APIUrls.FACTS.GET_RANDOM)
  }
}
