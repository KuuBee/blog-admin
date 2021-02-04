import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleIndexComponent } from './index/index.component';
import { ArticleCreateComponent } from './create/create.component';

const COMPONENTS = [ArticleIndexComponent, ArticleCreateComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ArticleModule { }
