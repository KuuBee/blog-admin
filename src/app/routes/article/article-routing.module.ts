import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleIndexComponent } from './index/index.component';
import { ArticleCreateComponent } from './create/create.component';

const routes: Routes = [{ path: 'index', component: ArticleIndexComponent }, { path: 'create', component: ArticleCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
