import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomePageComponent } from './customer-home-page.component';
import {CustomerHomePageRoutingModule} from "./customer-home-page-routing.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {GoogleMapsModule} from "@angular/google-maps";
import {FeatherModule} from "angular-feather";
import {ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    CustomerHomePageComponent
  ],
  imports: [
    CommonModule,
    CustomerHomePageRoutingModule,
    NgSelectModule,
    MatOptionModule,
    MatSelectModule,
    GoogleMapsModule,
    FeatherModule,
    ReactiveFormsModule,
    sharedModule,
  ]
})
export class CustomerHomePageModule { }
