import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TUI_SANITIZER,
  TuiAlertModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WrapperComponent } from './core/wrapper/wrapper.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/wrapper/header/header.component';
import { SharedModule } from './shared/shared.module';
import { BasicAuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/unauth.interceptor';
import { MenuComponent } from './core/wrapper/menu/menu.component';

@NgModule({
  declarations: [WrapperComponent, HeaderComponent, MenuComponent],
  imports: [
    BrowserModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ]),
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [WrapperComponent],
})
export class AppModule {}
