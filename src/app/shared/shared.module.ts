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
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';

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
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
