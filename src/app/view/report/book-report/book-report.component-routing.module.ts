import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookReportComponent} from "./book-report.component";

const routes: Routes = [{ path: '', component: BookReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReportComponentRoutingModule { }
