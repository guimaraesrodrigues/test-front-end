import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { ResultsComponent } from './results.component';


export const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
  }
]

@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ResultsModule { }
