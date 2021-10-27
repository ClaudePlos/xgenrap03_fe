import {Action, createReducer, on} from '@ngrx/store';
import {ReportState, initializeReportState} from "./state";
import * as ReportsAction from './action'

const initialState = initializeReportState();

const reducer = createReducer(
    initialState,

    //
    on(ReportsAction.GetReportsAssignedToUser, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading};
      }),
    on(ReportsAction.GetReportsAssignedToUserSuccess, (state: ReportState, {payload}) => {
        console.log(payload);
    return {...state, loading: payload.isLoading, reports: payload.reports};
    }),
    on(ReportsAction.GetReportsAssignedToUserFailure, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading};
    }),

    //
    on(ReportsAction.AddNewReport, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading};
      }),
    on(ReportsAction.AddNewReportSuccess, (state: ReportState, {payload}) => {
        console.log(payload);
    return {...state, loading: payload.isLoading, reports: payload.reports };
    }),
    on(ReportsAction.AddNewReportFailure, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading};
    }),

    //
    on(ReportsAction.SaveReport, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading};
      }),
    on(ReportsAction.SaveReportSuccess, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading, report: payload.report };
    }),
    on(ReportsAction.SaveReportFailure, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading};
    }),

    //
    on(ReportsAction.DeleteReport, (state: ReportState, {payload}) => {
        return {...state, loading: payload.isLoading};
    }),
    on(ReportsAction.DeleteReportSuccess, (state: ReportState, {payload}) => {
        console.log(payload);
    return {...state, loading: payload.isLoading, reports: payload.reports };
    }),
    on(ReportsAction.DeleteReportFailure, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading};
    }),

    //
    on(ReportsAction.GetReport, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading};
    }),
    on(ReportsAction.GetReportSuccess, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading, report: payload.report};
    }),
    on(ReportsAction.GetReportFailure, (state: ReportState, {payload}) => {
    return {...state, loading: payload.isLoading};
    }),

);

export function ReportReducer(state: ReportState | undefined, action: Action): ReportState {
    return reducer(state, action);
}