import {createAction, props} from '@ngrx/store';
import {Report} from "../../models/report.model"

//
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

//  
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

//  
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