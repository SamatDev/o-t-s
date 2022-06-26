import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { AddFromJsonComponent } from '../dialogs/add-from-json/add-from-json.component';
import { TranslateKeysComponent } from './main/translate-keys/translate-keys.component';
import { UseKeyComponent } from '../dialogs/use-key/use-key.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { FilterByTranslateDataPipe } from '../core/pipes/filter-by-translate-data.pipe';
import { AddLangLocaleComponent } from '../dialogs/add-lang-locale/add-lang-locale.component';
import { PortalsComponent } from './portals/portals.component';
import { TranslatesComponent } from './translates/translates.component';
import { DialogDeleteComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { EditLangDialogComponent } from '../dialogs/edit-lang-dialog/edit-lang-dialog.component';
import { AddNewKeyComponent } from '../dialogs/add-new-key/add-new-key.component';

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
  {
    path: 'portals',
    component: PortalsComponent,
    redirectTo: '',
    data: {
      title: 'Проекты',
    },
  },
  {
    path: 'portals/:path',
    component: PortalsComponent,
  },
  {
    path: 'portals/:path/:locale',
    component: TranslatesComponent,
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
    PortalsComponent,
    TranslatesComponent,
    DialogDeleteComponent,
    EditLangDialogComponent,
    AddNewKeyComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [ApiService],
})
export class PagesModule {}
