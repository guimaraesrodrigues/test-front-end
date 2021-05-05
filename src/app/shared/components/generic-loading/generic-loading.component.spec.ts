import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GenericLoadingComponent } from './generic-loading.component';

describe('GenericLoadingComponent', () => {
  let component: GenericLoadingComponent;
  let fixture: ComponentFixture<GenericLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatProgressSpinnerModule ],
      declarations: [ GenericLoadingComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
