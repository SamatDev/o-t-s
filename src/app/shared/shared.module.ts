import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiActionModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiSelectModule,
  TuiTextAreaModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { LangsService } from '../core/services/langs.service';
import { TranslatesService } from '../core/services/translates.service';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiTextAreaModule,
  TuiHostedDropdownModule,
  TuiSvgModule,
  TuiDataListModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiTableModule,
  TuiScrollbarModule,
  TuiLoaderModule,
  TuiActionModule,
  TuiToggleModule,
  TuiTooltipModule,
  TuiDropdownModule,
  TuiActiveZoneModule,
  TuiSidebarModule,
  TuiLinkModule,
];

@NgModule({
  imports: modules,
  providers: [LangsService, TranslatesService],
  exports: [...modules],
})
export class SharedModule {}
