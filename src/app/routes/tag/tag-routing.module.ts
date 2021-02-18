import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagIndexComponent } from './index/index.component';
import { TagCreateComponent } from './create/create.component';

const routes: Routes = [{ path: 'index', component: TagIndexComponent },
{ path: 'create', component: TagCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
