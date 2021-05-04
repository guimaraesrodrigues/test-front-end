import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactModel } from 'src/app/shared/models/fact.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public factsList: FactModel[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('oiiii ');
    // console.log('oiiii ', this.router.getCurrentNavigation()?.extras.state)
    // this.router.events.subscribe(
    //   (data) => {
    //     console.log('oiii ', this.router.getCurrentNavigation()?.extras.state)

    //   }
    // )
  }

}
