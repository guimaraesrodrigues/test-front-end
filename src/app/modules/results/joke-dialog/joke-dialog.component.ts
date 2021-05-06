import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Joke } from 'src/app/shared/models/joke.model';

@Component({
  selector: 'app-joke-dialog',
  templateUrl: './joke-dialog.component.html',
  styleUrls: ['./joke-dialog.component.scss']
})
export class JokeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<JokeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
