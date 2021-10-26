import {Injectable} from "@angular/core";
import {ReportsService} from "../../services/reports.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import * as ReportsAction from './action'
import {Router} from "@angular/router";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import { GetReportsResponse } from "../../services/response/_index";


@Injectable()
export class ReportEffects {

        constructor(private service: ReportsService, private action$: Actions,
                    private router: Router) {
        }

        GetReportsAssignedToUser$: Observable<Action> = createEffect(() =>
            this.action$.pipe(
            ofType(ReportsAction.GetReportsAssignedToUser),
            mergeMap(action =>
                this.service.getReportsAssignedToMe().pipe(
                map((data: GetReportsResponse) => {
                    return ReportsAction.GetReportsAssignedToUserSuccess({payload: {isLoading: false, reports: data.body}});
                }),
                catchError((data: Error) => {
                    return of(ReportsAction.GetReportsAssignedToUserFailure({payload: {isLoading: true}}))
                })
                )
            )
            )
        );

        AddNewReport$: Observable<Action> = createEffect(() =>
            this.action$.pipe(
            ofType(ReportsAction.AddNewReport),
            mergeMap(action =>
                this.service.addNewReport(action.payload.newReport).pipe(
                map((data: GetReportsResponse) => {
                    return ReportsAction.AddNewReportSuccess({payload: {isLoading: false, reports: data.body}});
                }),
                catchError((data: Error) => {
                    return of(ReportsAction.AddNewReportFailure({payload: {isLoading: true}}))
                })
                )
            )
            )
        );

        DeleteReport$: Observable<Action> = createEffect(() =>
            this.action$.pipe(
            ofType(ReportsAction.DeleteReport),
            mergeMap(action =>
                this.service.deleteReport(action.payload.reportId).pipe(
                map((data: GetReportsResponse) => {
                    return ReportsAction.DeleteReportSuccess({payload: {isLoading: false, reports: data.body}});
                }),
                catchError((data: Error) => {
                    return of(ReportsAction.DeleteReportFailure({payload: {isLoading: true}}))
                })
                )
            )
            )
        );

}