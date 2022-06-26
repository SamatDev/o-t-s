import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  Inject,
  Injector,
} from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { TranslateTypes } from 'src/app/core/interfaces/types';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UseKeyComponent } from 'src/app/dialogs/use-key/use-key.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-translate-keys',
  templateUrl: './translate-keys.component.html',
  styleUrls: ['./translate-keys.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateKeysComponent
  implements OnInit, OnChanges, AfterViewInit
{
  translateData: Record<string, string> | null = null;
  frontendRu: Record<string, string> | null = null;
  gamesRu: Record<string, string> | null = null;
  isLoading: boolean = false;

  get isSuper() {
    return this.authService.isSuper;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private authService: AuthService
  ) {}

  @Input('project')
  project: TranslateTypes | undefined;

  @Input('lang')
  lang: string | undefined;

  @Input('update')
  $update: Subject<void> | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lang && this.project) this.getTranslates(this.lang, this.project);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.$update?.subscribe((next) => {
      if (this.lang && this.project) this.update(this.lang, this.project);
    });
  }

  getTranslates(lang: string, project: TranslateTypes) {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.update(lang, project);
  }

  update(lang: string, project: TranslateTypes) {
    if (!lang || !project) return;
    this.isLoading = true;
  }

  openChangeKeysDialog(key: string, value: string) {
    this.dialogService
      .open(new PolymorpheusComponent(UseKeyComponent), {
        dismissible: true,
        data: {
          key,
          value,
          lang: this.lang,
          project: this.project,
          mode: this.translateData ? 'changeAny' : 'changeRu',
          changeValue: this.translateData ? this.translateData[key] : null,
        },
      })
      .subscribe((result: any) => {
        const { mode, key, value, lang, project, oldKey } = result;
        this.isLoading = true;
        this.cdr.detectChanges();
        this.updateTranslate({
          mode,
          key,
          lang,
          project,
          value,
          oldKey,
        });
      });
  }

  openAddRuDialog() {
    this.dialogService
      .open(new PolymorpheusComponent(UseKeyComponent), {
        dismissible: true,
        data: {
          lang: this.lang,
          project: this.project,
          mode: 'addRu',
        },
      })
      .subscribe((result: any) => {
        const { mode, key, value, lang, project } = result;
        this.isLoading = true;
        this.cdr.detectChanges();
        this.updateTranslate({
          mode,
          key,
          lang,
          project,
          value,
        });
      });
  }

  ngOnDestroy() {
    this.$update?.unsubscribe();
  }

  private updateTranslate(data: {
    mode: 'changeAny' | 'changeRu' | 'addRu';
    key: string;
    lang: string;
    project: TranslateTypes;
    value: string;
    oldKey?: string;
  }) {
    const { lang, project, mode, value } = data;
    switch (mode) {
      case 'changeAny': {
        if (!this.translateData) return;
        this.translateData[data.key] = value;

        break;
      }

      case 'addRu':
      case 'changeRu': {
        if (!this.frontendRu || !this.gamesRu) return;
        this.isLoading = true;
        const translates: Record<string, string> = Object.assign(
          project === 'frontend' ? this.frontendRu : this.gamesRu
        );
        if (data.oldKey) delete translates[data.oldKey];
        translates[data.key] = value;

        break;
      }
    }
  }

  isFilter: boolean = false;
}

function objectToRecord(obj: object | null) {
  if (obj === null) return {};
  let keyValueObj: Record<string, string> = {};
  getKeyValueFromJsonObject(obj, '', keyValueObj);
  return keyValueObj;
}

function getKeyValueFromJsonObject(
  obj: any,
  initKey: string,
  KVO: Record<string, string>
) {
  const keys = getObjectKeys(obj);
  keys.forEach((key) => {
    const fullKey = initKey.length ? initKey + '.' + key : key;
    if (typeof obj[key] !== 'string') {
      getKeyValueFromJsonObject(obj[key], fullKey, KVO);
    } else {
      KVO[fullKey] = obj[key];
    }
  });
}

function getObjectKeys(obj: object): string[] {
  return Object.keys(obj);
}
