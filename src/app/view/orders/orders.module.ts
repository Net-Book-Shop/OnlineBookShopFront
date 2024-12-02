import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import {RouterOutlet} from "@angular/router";
import {DatepickerModule} from "ng2-datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {OrdersRoutingModule} from "./orders-routing.module";



@NgModule({
  declarations: [
    OrdersComponent
  ],
    imports: [
      CommonModule,
      RouterOutlet,
      DatepickerModule,
      FormsModule,
      ReactiveFormsModule,
      MatOptionModule,
      MatSelectModule,
      OrdersRoutingModule
    ]
})
export class OrdersModule { }
