import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentIndexComponent } from './index/index.component';

const COMPONENTS = [CommentIndexComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    CommentRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class CommentModule { }
