import {Report} from "../../models/report.model";
import { ReportData } from 'src/app/models/reportData.model';
import {createFeatureSelector, createSelector, State} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";


export interface ReportState {
    loading: boolean,
    reports: Report[],
    report: Report
    isLogged: boolean,
    error: HttpErrorResponse,
    jsonData: []
}

export const initializeReportState = (): ReportState => {
  return {
    loading: false,
    reports: null,
    report: null,
    isLogged: false,
    error: null,
    jsonData: []
  }
}


export const getReportState = createFeatureSelector<ReportState>('reportStore');

export const getError = createSelector(getReportState, (reportState: ReportState) => reportState.error);
export const getLoading  = createSelector(getReportState, (reportState: ReportState) => reportState.loading);