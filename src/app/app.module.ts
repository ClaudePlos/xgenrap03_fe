import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsComponent } from './reports/reports.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';

import { MatTableModule, MatMenuModule, MatIconModule, MatDialogModule, MatInputModule, MatSortModule } from '@angular/material';

import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ReportReducer} from "./store/reducer";
import {ReportEffects} from "./store/effect";


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    ReportsComponent,
    ReportsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatInputModule,
    StoreModule.forRoot({reportStore: ReportReducer}),
    EffectsModule.forRoot([ReportEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
