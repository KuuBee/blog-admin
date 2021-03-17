import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReplyRoutingModule } from './reply-routing.module';
import { ReplyIndexComponent } from './index/index.component';

const COMPONENTS = [ReplyIndexComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ReplyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ReplyModule { }
