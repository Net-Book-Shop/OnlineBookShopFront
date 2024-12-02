import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: 'order-report',
        loadChildren: () =>
          import('./order-report/order-report.module').then(
            (m) => m.OrderReportModule
          ),
      },
      {
        path: 'customer-list',
        loadChildren: () =>
          import('./customer-report/customer-report.module').then(
            (m) => m.CustomerReportModule
          ),
      },
      {
        path: 'book-review-report',
        loadChildren: () =>
          import('./book-review-report/book-review-report.module').then(
            (m) => m.BookReviewReportModule
          ),
      },
      {
        path: 'book-report',
        loadChildren: () =>
          import('./book-report/book-report.module').then(
            (m) => m.BookReportModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
