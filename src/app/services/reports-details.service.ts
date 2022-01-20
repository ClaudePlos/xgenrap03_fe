import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetReportDetailsResponse } from "./response/_index";

@Injectable({
    providedIn: 'root'
  })

export class ReportsDetailsService {
    endpoint: string = environment.taskBaseUrl + '/api';

    constructor(private httpClient: HttpClient) {
    }

    getDetailsForReport(rapId: string): Observable<GetReportDetailsResponse> {
        const url = `${this.endpoint}/reports/${rapId}`;
        return this.httpClient.get<GetReportDetailsResponse>(url);
    }
}