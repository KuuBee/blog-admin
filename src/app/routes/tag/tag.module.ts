import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagIndexComponent } from './index/index.component';
import { TagCreateComponent } from './create/create.component';
import { CreateDialogComponent } from './shared/component/create-dialog/create-dialog.component';

const COMPONENTS = [TagIndexComponent, TagCreateComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    TagRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    CreateDialogComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class TagModule { }
