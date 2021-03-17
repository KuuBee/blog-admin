import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentIndexComponent } from './index/index.component';

const routes: Routes = [{ path: 'index', component: CommentIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRoutingModule { }
