import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersComponent} from "./orders.component";

const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: 'view-order',
        loadChildren: () =>
          import('./orders-view/orders-view.module').then((m) => m.OrdersViewModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
