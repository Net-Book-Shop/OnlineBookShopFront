import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookReviewReportComponent} from "./book-review-report.component";

const routes: Routes = [{ path: '', component: BookReviewReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReviewReportComponentRoutingModule { }
