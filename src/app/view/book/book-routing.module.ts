import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book.component";

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: 'add-book',
        loadChildren: () =>
          import('./add-book/add-book.module').then(
            (m) => m.AddBookModule
          ),
      },
      {
        path: 'view-book',
        loadChildren: () =>
          import('./view-book/view-book.module').then(
            (m) => m.ViewBookModule
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then(
            (m) => m.CategoryModule
          ),
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
