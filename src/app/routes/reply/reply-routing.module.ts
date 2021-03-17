import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReplyIndexComponent } from './index/index.component';

const routes: Routes = [{ path: 'index', component: ReplyIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplyRoutingModule { }
