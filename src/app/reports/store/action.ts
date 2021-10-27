import {createAction, props} from '@ngrx/store';
import {Report} from "../../models/report.model"

// GetReportsAssignedToUser todo
  export const GetReportsAssignedToUser = createAction(
    'GetReportsAssignedToUser',
    props<{ payload: { isLoading: boolean } }>()
  );

  export const GetReportsAssignedToUserSuccess = createAction(
    'GetReportsAssignedToUserSuccess',
    props<{ payload: { isLoading: boolean, reports: Report[] } }>()
  );

  export const GetReportsAssignedToUserFailure = createAction(
    'GetReportsAssignedToUserFailure',
    props<{ payload: { isLoading: boolean } }>()
  );

// AddNewReport  
  export const AddNewReport = createAction(
    'AddNewReport',
    props<{ payload: { newReport: Report, isLoading: boolean } }>()
  );

  export const AddNewReportSuccess = createAction(
    'AddNewReportSuccess',
    props<{ payload: { isLoading: boolean, reports: Report[] } }>()
  );

  export const AddNewReportFailure = createAction(
    'AddNewReportFailure',
    props<{ payload: { isLoading: boolean } }>()
  );

// DeleteReport  
  export const DeleteReport = createAction(
    'DeleteReport',
    props<{ payload: { reportId: number, isLoading: boolean } }>()
  );

  export const DeleteReportSuccess = createAction(
    'DeleteReportSuccess',
    props<{ payload: { isLoading: boolean, reports: Report[] } }>()
  );

  export const DeleteReportFailure = createAction(
    'DeleteReportFailure',
    props<{ payload: { isLoading: boolean } }>()
  );


  // GetReport
  export const GetReport = createAction(
    'GetReport',
    props<{ payload: { isLoading: boolean, id: string } }>()
  );

  export const GetReportSuccess = createAction(
    'GetReportSuccess',
    props<{ payload: { isLoading: boolean, report: Report } }>()
  );

  export const GetReportFailure = createAction(
    'GetReportFailure',
    props<{ payload: { isLoading: boolean, report: Report } }>()
  );

  // SaveReport
  export const SaveReport = createAction(
    'SaveReport',
    props<{ payload: { isLoading: boolean, report: Report } }>()
  );

  export const SaveReportSuccess = createAction(
    'SaveReportSuccess',
    props<{ payload: { isLoading: boolean, report:  Report } }>()
  );

  export const SaveReportFailure = createAction(
    'SaveReportFailure',
    props<{ payload: { isLoading: boolean } }>()
  );

  // RunSql
  export const RunSql = createAction(
    'RunSql',
    props<{ payload: { isLoading: boolean, sqlQuery: string } }>()
  );

  export const RunSqlSuccess = createAction(
    'RunSqlSuccess',
    props<{ payload: { isLoading: boolean, jsonData:  JSON } }>()
  );

  export const RunSqlFailure = createAction(
    'RunSqlFailure',
    props<{ payload: { isLoading: boolean } }>()
  );