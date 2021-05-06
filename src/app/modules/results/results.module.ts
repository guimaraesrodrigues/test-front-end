import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { ResultsComponent } from './results.component';
import { ResultsRoutingModule } from './results-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JokeDialogComponent } from './joke-dialog/joke-dialog.component';

@NgModule({
  declarations: [
    ResultsComponent,
    JokeDialogComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    SharedModule
  ]
})
export class ResultsModule { }
