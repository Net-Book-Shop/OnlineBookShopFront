import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book.component';
import {AddBookRoutingModule} from "./add-book-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    AddBookComponent
  ],
  imports: [
    CommonModule,
    AddBookRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    sharedModule,
  ]
})
export class AddBookModule { }
