import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { TuiDialogService, TuiHostedDropdownComponent } from '@taiga-ui/core';
import { TranslateServerService } from 'src/app/core/services/translate-service.service';
import { AddFromJsonComponent } from 'src/app/dialogs/add-from-json/add-from-json.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TranslateTypes } from 'src/app/core/interfaces/types';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {}
  readonly langs: { lang: string; title: string }[] = [
    {
      lang: 'ru',
      title: 'Русский',
    },
    {
      lang: 'ua',
      title: 'Украинский',
    },
    {
      lang: 'uz',
      title: 'Узбекский',
    },
    {
      lang: 'en',
      title: 'Английский',
    },
  ];
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
    this.activatedRoute.queryParams.subscribe((params) => {
      const project = params['project'];
      const lang = params['lang'];
      if (this.projects.map((el) => el.type).includes(project))
        this.project = project;
      if (this.langs.map((el) => el.lang).includes(lang)) this.lang = lang;
    });
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

  openFr = false;
  openG = false;
}
