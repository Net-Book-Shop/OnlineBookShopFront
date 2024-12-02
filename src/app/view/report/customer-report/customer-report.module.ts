import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerReportComponent } from './customer-report.component';
import {CustomerReportComponentRoutingModule} from "./customer-report.component-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GoogleMapsModule} from "@angular/google-maps";
import {FeatherModule} from "angular-feather";
import {ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    CustomerReportComponent
  ],
  imports: [
    CommonModule,
    CustomerReportComponentRoutingModule,
    NgSelectModule,
    MatOptionModule,
    MatSelectModule,
    GoogleMapsModule,
    FeatherModule,
    ReactiveFormsModule,
    sharedModule,
  ]
})
export class CustomerReportModule { }
