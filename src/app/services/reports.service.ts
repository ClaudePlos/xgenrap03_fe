import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GetReportsResponse, GetReportResponse, SaveReportResponse, RunSqlResponse } from "./response/_index";
import { Report } from '../models/report.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class ReportsService {
    endpoint: string = environment.taskBaseUrl + '/api';
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    currentUser = {};
  
    constructor(
      private httpClient: HttpClient,
      public router: Router
    ) {
    }

    // User profile
    reportsList(id): Observable<any> {
        let api = `${this.endpoint}/reports/user-reports/${id}`;
        return this.httpClient.get(api, { headers: this.headers }).pipe(
        map((res: Response) => {
            return res || {}
        }),
          catchError(this.handleError)
        )
    } 

    getReportsAssignedToMe(): Observable<GetReportsResponse> {
      const url = `${this.endpoint}/reports/reports`;
      return this.httpClient.get<GetReportsResponse>(url);
    }

    getReport(id: string): Observable<GetReportResponse> {
      const url = `${this.endpoint}/reports/${id}`;
      return this.httpClient.get<GetReportResponse>(url);
    }

    addNewReport(report: Report): Observable<GetReportsResponse> {
      const url = `${this.endpoint}/reports`;
      return this.httpClient.post<GetReportsResponse>(url, report);
    }

    saveReport(report: Report): Observable<SaveReportResponse> {
      const url = `${this.endpoint}/reports/report`;
      return this.httpClient.post<SaveReportResponse>(url, report);
    }

    deleteReport(reportId): Observable<GetReportsResponse> {
      const url = `${this.endpoint}/reports/delete//${reportId}`;
      return this.httpClient.get<GetReportsResponse>(url);
    }

    runSql(sqlQuery: string): Observable<RunSqlResponse> {
      const url = `${this.endpoint}/reports/run-sql`;
      return this.httpClient.post<RunSqlResponse>(url, sqlQuery);
    }

    

    



    // Error 
    handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
    } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
    } 

}