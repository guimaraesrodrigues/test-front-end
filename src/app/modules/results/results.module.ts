import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

import { ResultsComponent } from './results.component';
import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatCardModule,
    SharedModule
  ]
})
export class ResultsModule { }
