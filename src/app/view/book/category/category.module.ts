import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import {CategoryRoutingModule} from "./category-routing.module";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    sharedModule,
  ]
})
export class CategoryModule { }
