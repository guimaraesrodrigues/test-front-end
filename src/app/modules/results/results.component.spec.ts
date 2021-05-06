import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ResultsComponent } from './results.component';
import { JokeService } from 'src/app/shared/services/jokes.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let jokeServiceStub: jasmine.SpyObj<JokeService>;

  const queryMock = {
    total: 2, 
    result: [{id: 'abc', value: 'blabla'}]
  };
  const errorMock = {error: 'error'};
  const activatedRouteMock = {
    snapshot: {
      params: {
        query: 'snakes'
      }
    }
  };
  const routerMock = {
    url: 'pedidos/12345/chat',
    events: of(new NavigationEnd(123, 'results', 'results;query=snakes')),
    getCurrentNavigation: () => {return {extras: {state: {data: queryMock}}}}
  };
  
  beforeEach(async () => {
    jokeServiceStub = jasmine.createSpyObj('JokeService', [
      'getJokesWithQuery'
    ]);

    jokeServiceStub.getJokesWithQuery.and.returnValue(of());
    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: JokeService,
          useValue: jokeServiceStub
        },
        { 
          provide: ActivatedRoute, 
          useValue: activatedRouteMock 
        },
        { 
          provide: Router, 
          useValue: routerMock 
        }
      ],
      declarations: [ ResultsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    component.searchQuery = 'blabla';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate jokesList when get jokes returns with data', () => {
    jokeServiceStub.getJokesWithQuery.and.returnValue(of(queryMock));

    component['searchJokes']();

    expect(component.jokesList).toEqual(queryMock.result);
  });

  it('should call #displayRequestError when get jokes returns with error', () => {
    const spyOnDisplayRequestError = spyOn(component as any, 'displayRequestError');
    
    jokeServiceStub.getJokesWithQuery.and.returnValue(throwError(errorMock));
    component['searchJokes']();

    expect(spyOnDisplayRequestError).toHaveBeenCalledWith(errorMock);
  });

  it('should call snackbar open when #displayRequestError is called', () => {
    const spyOndDisplayRequestError = spyOn(component['_snackBar'], 'open');

    component['displayRequestError'](errorMock);

    expect(spyOndDisplayRequestError).toHaveBeenCalled();
  });

  it('should  NOT call #searchJokes if jokesList has a valid value', () => {
    const spyOnSearchJokes = spyOn(component as any, 'searchJokes');
    component.jokesList = queryMock.result;

    component['verifyQueryAndGetJokes']();

    expect(spyOnSearchJokes).not.toHaveBeenCalled();
  });
});
