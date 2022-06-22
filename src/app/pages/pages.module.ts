import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { TranslateServerService } from '../core/services/translate-service.service';
import { AddFromJsonComponent } from '../dialogs/add-from-json/add-from-json.component';
import { TranslateKeysComponent } from './main/translate-keys/translate-keys.component';
import { UseKeyComponent } from '../dialogs/use-key/use-key.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { FilterByTranslateDataPipe } from '../core/pipes/filter-by-translate-data.pipe';
import { AddLangLocaleComponent } from '../dialogs/add-lang-locale/add-lang-locale.component';
import { LocaleEditorComponent } from '../dialogs/locale-editor/locale-editor.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    AddFromJsonComponent,
    TranslateKeysComponent,
    UseKeyComponent,
    FilterByTranslateDataPipe,
    AddLangLocaleComponent,
    LocaleEditorComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [ApiService, TranslateServerService],
})
export class PagesModule {}
