import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GetReportsResponse, GetReportResponse } from "./response/_index";
import { Report } from '../models/report.model';

@Injectable({
    providedIn: 'root'
  })

export class ReportsService {
    endpoint: string = 'http://localhost:8080/api';
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

    addNewReport(report: Report): Observable<GetReportsResponse> {
      const url = `${this.endpoint}/reports`;
      return this.httpClient.post<GetReportsResponse>(url, report);
    }

    deleteReport(reportId): Observable<GetReportsResponse> {
      const url = `${this.endpoint}/reports/delete//${reportId}`;
      return this.httpClient.get<GetReportsResponse>(url);
    }

    getReport(id: string): Observable<GetReportResponse> {
      const url = `${this.endpoint}/reports/${id}`;
      return this.httpClient.get<GetReportResponse>(url);
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