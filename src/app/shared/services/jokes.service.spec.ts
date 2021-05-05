import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JokeService } from './jokes.service';

describe('JokeService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
