import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {ReportState} from "../store/state";
import { Report } from 'src/app/models/report.model';
import {MatDialog} from "@angular/material/dialog";
import * as ReportsAction from "../store/action";
import {map} from "rxjs/operators";
import { MatTableDataSource, MatSort } from "@angular/material";

@Component({
  selector: 'app-show-reports-details',
  templateUrl: './show-reports-details.component.html',
  styleUrls: ['./show-reports-details.component.css']
})
export class ShowReportsDetailsComponent implements OnInit {

  public keys = [];

  state: Observable<ReportState>;
  dataSubscription: Subscription;
  loading: boolean;
  report: Report;
  jsonData: [];

  displayedColumns = ['rap_id', 'rap_name'];
  dataSource = new MatTableDataSource<any[]>();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(
    private store: Store<{ reportStore: ReportState }>,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      this.state = store.pipe(select('reportStore'));

      

     }

       

  ngOnInit() {
    this.dataSubscription = this.state.pipe(
      map(data => {
        this.loading = data.loading;
        this.report = data.report;
        this.jsonData = data.jsonData;
        this.dataSource.data = this.jsonData;
        if (this.dataSource.data && this.dataSource.data.length > 0) {
        this.keys = Object.keys(this.dataSource.data[0]);
      }
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

  onChange(newSql: string): void {
    this.report.rapSql = newSql;
    this.store.dispatch(ReportsAction.SaveReport({payload: {isLoading: true, report: this.report}}));
  }

  runSql(newSql: string): void {
    this.store.dispatch(ReportsAction.RunSql({payload: {isLoading: true, sqlQuery: newSql}}));
  }

  test(){
    console.log(this.dataSource.data);
    console.log(this.keys);
    // this.cellNames = JSON.parse(this.jsonData.cellName);
  }
  
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}


export interface Element {
  rap_id: number;
  rap_name: string;
  rap_desc: string;
} 


const ELEMENT_DATA: Element[] =  [
  {
      "rap_id": 1,
      "rap_name": "RAP01",
      "rap_desc": "Raport pocz"
  },
  {
      "rap_id": 2,
      "rap_name": "Rap Kont",
      "rap_desc": "KOnta"
  },
  {
      "rap_id": 3,
      "rap_name": "RAP03",
      "rap_desc": "Test"
  }
];