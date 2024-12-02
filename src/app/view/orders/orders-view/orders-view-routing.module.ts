import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrdersViewComponent} from "./orders-view.component";

const routes: Routes = [{ path: '', component: OrdersViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersViewRoutingModule { }
