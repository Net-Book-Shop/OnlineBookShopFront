import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddBookComponent} from "./add-book.component";

const routes: Routes = [{ path: '', component: AddBookComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookRoutingModule {}
