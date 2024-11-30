import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewBookComponent } from './view-book.component';
import {ViewBookRoutingModule} from "./view-book-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    ViewBookComponent
  ],
  imports: [
    CommonModule,
    ViewBookRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    sharedModule,
  ]
})
export class ViewBookModule { }
