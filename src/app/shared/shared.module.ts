import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GenericLoadingComponent } from './components/generic-loading/generic-loading.component';

@NgModule({
  declarations: [
    GenericLoadingComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,

  ],
  exports: [
    GenericLoadingComponent,
  ]
})
export class SharedModule { }
