import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { AuthService } from '../shared/auth.service';
import { Report } from '../models/report.model';
import { MatTableDataSource, MatSort } from "@angular/material";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {Observable, Subscription, Subject} from "rxjs";
import {ReportState} from "../store/state";
import {select, Store} from "@ngrx/store";
import * as ReportsAction from "../store/action";
import { User } from "../shared/user"

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  state: Observable<ReportState>;
  dataSubscription: Subscription;
  

  displayedColumns: string[] = ['id', 'rapName','rapDesc', 'star'];
  dataSource = new MatTableDataSource<Report>();
  currentOpReports: Report[];
  loading: boolean;
  loggedUser: User;

  subject = new Subject<string>();

  reports$: Observable<Report[]>;

  myObj:any = 
   [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];


  customObservable = new Observable( observer => {
    setInterval(() => 
       observer.next(new Date()), 1000);
    });

  blog = new Observable( observer => {
    observer.next("Article 1");
    observer.next(this.myObj);
    if (1!==1) {
      observer.error('error message');
    }
    observer.complete();
  });  
  

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }


  constructor(
    private store: Store<{ reportStore: ReportState }>,
    public reportsService: ReportsService,
    public authService: AuthService,
    public dialog: MatDialog
  ) { 
    let opId = localStorage.getItem('opId');
    this.reportsService.reportsList(opId).subscribe(res => {
      this.currentOpReports = res;
    })
    this.state = store.pipe(select('reportStore'));
  }

  ngOnInit() {
    this.dataSubscription = this.state.pipe(
      map(data => {
        this.loading = data.loading;
        this.currentOpReports = data.reports;
        this.dataSource.data = this.currentOpReports;
      })
    ).subscribe();

    this.store.dispatch(ReportsAction.GetReportsAssignedToUser({payload: {isLoading: true}}))

  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  addItem(reportName: string) {
    let newReport: Report = { id:1, rapName: reportName, rapDesc: reportName, rapOpId: 123};
    //this.dataSource.data.push(rep);
    this.store.dispatch(ReportsAction.AddNewReport({payload: {isLoading: true, newReport: newReport}})   );
  }

  deleteItem(reportId: number) {
    this.store.dispatch(ReportsAction.DeleteReport({payload: {isLoading: true, reportId: reportId}})   );
  }

  subscribe() {
    //this.customObservable.subscribe( data => {console.log(data) });
    // this.blog.subscribe(
    //   value => console.log('New Article:', value),
    //   error => { console.log('Error!!', error) },
    //   () => { console.log('End of values') }
    //   );

      this.subject.subscribe(
        value => console.log('New Subject:', value),
        error => { console.log('Error!!', error) },
        () => { console.log('End of values') }
      );

  }

  unsubscribe() {
    this.subject.complete();
  }

  add(reportName: string) {
    this.myObj.push({ id: 21, name: reportName });
    this.subject.next(this.myObj);
  }

  // addItem(tenderId: number): void {
  //   const conf = new MatDialogConfig();
  //   conf.disableClose = true;

  //   const dialogRef = this.dialog.open(AssignTenderComponent, conf);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       this.store.dispatch(TenderAction.GetTendersAssignedToUser({payload: {isLoading: true}}))
  //     }
  //   });
  // }

}
