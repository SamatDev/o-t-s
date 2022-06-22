import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogService,
  TuiHostedDropdownComponent,
} from '@taiga-ui/core';
import { TranslateServerService } from 'src/app/core/services/translate-service.service';
import { AddFromJsonComponent } from 'src/app/dialogs/add-from-json/add-from-json.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PortalsLangs, TranslateTypes } from 'src/app/core/interfaces/types';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AddLangLocaleComponent } from 'src/app/dialogs/add-lang-locale/add-lang-locale.component';
import { LocaleEditorComponent } from 'src/app/dialogs/locale-editor/locale-editor.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  constructor(
    private translateServerService: TranslateServerService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  get langs(): PortalsLangs[] {
    return this.translateServerService.langs;
  }

  readonly projects: { type: TranslateTypes; title: string }[] = [
    {
      type: 'frontend',
      title: 'Frontend translates',
    },
    {
      type: 'games',
      title: 'Games translates',
    },
  ];

  get isSuper() {
    return this.authService.isSuper;
  }

  project: TranslateTypes = 'frontend';
  lang = 'ru';
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  $update: Subject<void> = new Subject();

  ngOnInit(): void {
    this.translateServerService.uploadLangs();
  }

  onClick(type: TranslateTypes, lang: string): void {
    if (this.openFr) this.openFr = false;
    if (this.openG) this.openG = false;
    this.project = type;
    this.lang = lang;
  }

  openJsonUpdateForm() {
    this.dialogService
      .open(new PolymorpheusComponent(AddFromJsonComponent, this.injector), {
        data: {
          langs: this.langs,
          projects: this.projects,
        },
        dismissible: true,
      })
      .subscribe((result: any) => {
        if (result?.lang !== this.lang || result?.project !== this.project) {
          this.lang = result?.lang;
          this.project = result?.project;
        } else {
          this.$update.next();
        }
      });
  }

  openAddLocale() {
    this.dialogService
      .open(new PolymorpheusComponent(AddLangLocaleComponent, this.injector))
      .subscribe((result: any) => {
        this.addLangLocale(result);
      });
  }

  openLocaleEditor() {
    this.dialogService
      .open(new PolymorpheusComponent(LocaleEditorComponent, this.injector))
      .subscribe();
  }

  private addLangLocale(data: Partial<PortalsLangs>) {
    this.translateServerService.addLangLocale(data).subscribe({
      next: () => {
        this.alertService.open('lang added').subscribe();
        this.translateServerService.uploadLangs();
      },
      error: (err) => this.alertService.open('Error'),
    });
  }

  openFr = false;
  openG = false;
}
