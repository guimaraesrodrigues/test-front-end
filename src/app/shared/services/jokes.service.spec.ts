import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JokeService } from './jokes.service';

describe('JokeService', () => {
  let service: JokeService;
  let controller: HttpTestingController;

  const queryMock = {
    total: 2, 
    result: [{id: 'abc', value: 'blabla'}]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(JokeService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of jokes when getJokesWithQuery is invoked', (done: DoneFn) => {
    service.getJokesWithQuery('').subscribe(req => {
      expect(req.result).toEqual(queryMock.result);
      done();
    });

    const op = controller.expectOne({method: 'GET', url:'https://api.chucknorris.io/jokes/search?query=' });

    op.flush(queryMock);

    controller.verify();
  });
});
