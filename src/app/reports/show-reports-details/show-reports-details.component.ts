import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {ReportState} from "../store/state";
import { Report } from 'src/app/models/report.model';
import * as ReportsAction from "../store/action";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-show-reports-details',
  templateUrl: './show-reports-details.component.html',
  styleUrls: ['./show-reports-details.component.css']
})
export class ShowReportsDetailsComponent implements OnInit {

  state: Observable<ReportState>;
  dataSubscription: Subscription;
  loading: boolean;
  report: Report;

  constructor(
    private store: Store<{ reportStore: ReportState }>,
    private route: ActivatedRoute) {
      this.state = store.pipe(select('reportStore'));
     }

  ngOnInit() {
    this.dataSubscription = this.state.pipe(
      map(data => {
        this.loading = data.loading;
        this.report = data.report;
      })
    ).subscribe();
    this.getReport();
  }

  getReport(): void {
    this.route.paramMap
      .subscribe(params => {
        console.log(params.get('id'));
        this.store.dispatch(ReportsAction.GetReport({payload: {isLoading: true, id: params.get('id')}}));
  })};
  

}
