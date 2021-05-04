import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FactModel } from '../models/fact.model';
import { APIUrls } from '../shared/constants';

export interface FactQueryResult {
  total?: number, 
  result?: FactModel[]
}

@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(
    private http: HttpClient,
  ) { }

  public getFactsWithQuery(query: string): Observable<FactQueryResult>{
    return this.http.get(APIUrls.FACTS.GET_WITH_QUERY(query));
  }

  /**
   *
   *
   * @returns {Observable<FactModel>}
   * @memberof FactsService
   */
  public getRandomFact(): Observable<FactModel> {
    return this.http.get(APIUrls.FACTS.GET_RANDOM)
  }
}
