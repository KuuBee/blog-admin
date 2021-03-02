import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FriendLinkRoutingModule } from './friend-link-routing.module';
import { FriendLinkIndexComponent } from './index/index.component';

const COMPONENTS = [FriendLinkIndexComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    FriendLinkRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class FriendLinkModule { }
