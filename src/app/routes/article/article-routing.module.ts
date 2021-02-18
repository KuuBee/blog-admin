import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleIndexComponent } from './index/index.component';
import { ArticleCreateComponent } from './create/create.component';
import { ArticleUpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'index', component: ArticleIndexComponent },
  { path: 'create', component: ArticleCreateComponent },
  { path: 'update/:id', component: ArticleUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
