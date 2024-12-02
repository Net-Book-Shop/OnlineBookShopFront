import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReportComponent } from './book-report.component';
import {BookReportComponentRoutingModule} from "./book-report.component-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GoogleMapsModule} from "@angular/google-maps";
import {FeatherModule} from "angular-feather";
import {ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    BookReportComponent
  ],
  imports: [
    CommonModule,
    BookReportComponentRoutingModule,
    NgSelectModule,
    MatOptionModule,
    MatSelectModule,
    GoogleMapsModule,
    FeatherModule,
    ReactiveFormsModule,
    sharedModule,
  ]
})
export class BookReportModule { }
