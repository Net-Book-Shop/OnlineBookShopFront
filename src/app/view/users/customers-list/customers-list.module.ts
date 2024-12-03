import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list.component';
import {CustomerListRoutingModule} from "./customer-list-routing.module";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    CustomerListRoutingModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    sharedModule
  ]
})
export class CustomersListModule { }
