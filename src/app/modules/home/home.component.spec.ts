import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { JokeService } from 'src/app/shared/services/jokes.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let jokeServiceStub: jasmine.SpyObj<JokeService>;

  const queryMock = {
    total: 2, 
    result: [{id: 'abc', value: 'blabla'}]
  };

  const errorMock = {error: 'error'}

  beforeEach(async () => {
    jokeServiceStub = jasmine.createSpyObj('JokeService', [
      'getJokesWithQuery'
    ]);

    jokeServiceStub.getJokesWithQuery.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: JokeService,
          useValue: jokeServiceStub
        }
      ],
      declarations: [ HomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.searchQuery = 'blabla';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #navigateToResults when get facts returns with data', () => {
    const spyOnNavigateToResults = spyOn(component as any, 'navigateToResults');
    
    jokeServiceStub.getJokesWithQuery.and.returnValue(of(queryMock));
    component.searchJokes();

    expect(spyOnNavigateToResults).toHaveBeenCalledWith(queryMock);
  });

  it('should call #displayRequestError when get facts returns with error', () => {
    const spyOnDisplayRequestError = spyOn(component as any, 'displayRequestError');
    
    jokeServiceStub.getJokesWithQuery.and.returnValue(throwError(errorMock));
    component.searchJokes();

    expect(spyOnDisplayRequestError).toHaveBeenCalledWith(errorMock);
  });

  it('should navigate to /results when #navigateToResults is called', () => {
    const spyOnNavigate = spyOn(component['router'], 'navigate');

    component['navigateToResults'](queryMock);

    expect(spyOnNavigate).toHaveBeenCalled();
  });

  it('should call snackbar open when #displayRequestError is called', () => {
    const spyOndDisplayRequestError = spyOn(component['_snackBar'], 'open');

    component['displayRequestError'](errorMock);

    expect(spyOndDisplayRequestError).toHaveBeenCalled();
  });
});
