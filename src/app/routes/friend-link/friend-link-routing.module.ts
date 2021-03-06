import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendLinkIndexComponent } from './index/index.component';

const routes: Routes = [{ path: 'index', component: FriendLinkIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendLinkRoutingModule { }
