import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassificationCreateComponent } from './create/create.component';
import { ClassificationIndexComponent } from './index/index.component';

const routes: Routes = [{ path: 'create', component: ClassificationCreateComponent },
{ path: 'index', component: ClassificationIndexComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRoutingModule { }
