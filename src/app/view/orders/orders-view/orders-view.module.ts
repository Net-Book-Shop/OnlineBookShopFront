import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersViewComponent } from './orders-view.component';
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";
import {OrdersViewRoutingModule} from "./orders-view-routing.module";



@NgModule({
  declarations: [
    OrdersViewComponent
  ],
  imports: [
    CommonModule,
    OrdersViewRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    sharedModule,
  ]
})
export class OrdersViewModule { }
