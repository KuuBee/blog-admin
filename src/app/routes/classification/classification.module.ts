import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationCreateComponent } from './create/create.component';
import { ClassificationIndexComponent } from './index/index.component';
import { CreateDialogComponent } from './shared/component/create-dialog/create-dialog.component';

const COMPONENTS = [ClassificationCreateComponent, ClassificationIndexComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ClassificationRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    CreateDialogComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ClassificationModule { }
