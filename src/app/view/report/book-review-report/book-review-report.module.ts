import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReviewReportComponent } from './book-review-report.component';
import {BookReviewReportComponentRoutingModule} from "./book-review-report.component-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GoogleMapsModule} from "@angular/google-maps";
import {FeatherModule} from "angular-feather";
import {ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    BookReviewReportComponent
  ],
  imports: [
    CommonModule,
    BookReviewReportComponentRoutingModule,
    NgSelectModule,
    MatOptionModule,
    MatSelectModule,
    GoogleMapsModule,
    FeatherModule,
    ReactiveFormsModule,
    sharedModule,
  ]
})
export class BookReviewReportModule { }
