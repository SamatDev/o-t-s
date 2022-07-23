import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { PortalObj } from 'src/app/core/interfaces/types';
import { PortalsService } from 'src/app/core/services/portals.service';
import { UseKeyComponent } from 'src/app/dialogs/use-key/use-key.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TranslatesService } from 'src/app/core/services/translates.service';
import { AddNewKeyComponent } from 'src/app/dialogs/add-new-key/add-new-key.component';
import { EditTranslateJsonComponent } from 'src/app/dialogs/edit-translate-json/edit-translate-json.component';
import { AuthService } from 'src/app/core/services/auth.service';

enum ComponentMode {
  compare = 'compare',
  default = 'default',
}

@Component({
  selector: 'app-translates',
  templateUrl: './translates.component.html',
  styleUrls: ['./translates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslatesComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private portalsService: PortalsService,
    private router: Router,
    public location: Location,
    private dialogService: TuiDialogService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslatesService,
    private alertService: TuiAlertService,
    private auth: AuthService
  ) {}

  mode: BehaviorSubject<ComponentMode> = new BehaviorSubject<ComponentMode>(
    ComponentMode.default
  );

  portal?: PortalObj;
  path!: string;
  locale!: string;

  ruTranslate?: Record<string, string>;
  compareTranslate: Record<string, string> | null = null;
  isFilter: boolean = false;
  isLoading: boolean = false;

  get isSuper() {
    return this.auth.isSuper;
  }

  ngOnInit(): void {
    console.log('called onInit translates');
    this.activatedRoute.params.subscribe((params) => {
      this.path = params['path'];
      this.locale = params['locale'];
      this.locale === 'ru'
        ? this.mode.next(ComponentMode.default)
        : this.mode.next(ComponentMode.compare);
      if (!this.path || !this.locale) this.router.navigateByUrl('');
      this.init();
    });
  }

  openChangeKeysDialog(key: string, value: string) {
    const oldKey: string = key;
    this.dialogService
      .open(new PolymorpheusComponent(UseKeyComponent), {
        dismissible: true,
        data: {
          key,
          value,
          lang: this.locale,
          path: this.path,
          portal: this.portal?.name,
          changeValue: this.compareTranslate
            ? this.compareTranslate[key]
            : null,
        },
      })
      .subscribe((result: any) => {
        this.updateTranslate({ ...result }, oldKey);
        this.cdr.detectChanges();
      });
  }

  openAddTranslateKeyDialog() {
    this.dialogService
      .open<{ key: string; value: string }>(
        new PolymorpheusComponent(AddNewKeyComponent)
      )
      .subscribe((result) => {
        const { key, value } = result!;
        if (this.ruTranslate!.hasOwnProperty(key)) {
          this.alertService
            .open('Такой ключ уже существует!', {
              status: TuiNotification.Error,
            })
            .subscribe();
        } else {
          const correctValue = value.replace(/"/g, '');
          this.ruTranslate![key] = correctValue;
          const newTranslates: Record<string, string> = {};
          newTranslates[key] = correctValue;
          this.addNewKey(newTranslates);
        }
      });
  }

  editTranslatesWithJson(locale: 'ru' | 'compare') {
    this.dialogService
      .open<{ locale: string; json: any }>(
        new PolymorpheusComponent(EditTranslateJsonComponent),
        {
          data: {
            locale: locale === 'ru' ? 'ru' : this.locale,
            json:
              locale === 'ru'
                ? JSON.stringify(this.ruTranslate)
                : JSON.stringify(this.compareTranslate),
          },
        }
      )
      .subscribe((result) => {
        const { json, locale } = result;
        this.updateTranslateWithJson(json, locale);
      });
  }

  private init(update: boolean = false) {
    console.log('called init');
    this.isLoading = true;
    if (update) this.portalsService._portals.next({});
    this.portalsService._portals
      .pipe(first((el) => !!el[this.path]))
      .subscribe((portals) => {
        const portal = portals[this.path];
        console.log('portals: ', portals);
        if (!portal) {
          this.router.navigateByUrl('');
          return;
        }
        this.portal = portal;

        const stringifyRuTranslate = portal.translates.find(
          (el) => el.locale === 'ru'
        );

        if (stringifyRuTranslate)
          this.ruTranslate = JSON.parse(stringifyRuTranslate.translates);

        if (this.locale !== 'ru') {
          const stringifyCompareTranslate = portal.translates.find(
            (el) => el.locale === this.locale
          );

          if (stringifyCompareTranslate)
            this.compareTranslate = JSON.parse(
              stringifyCompareTranslate.translates
            );
        }

        setTimeout(() => this.cdr.markForCheck());
        this.isLoading = false;
      });
  }

  private updateTranslate(
    data: { key: string; value: string; changeValue?: string },
    oldKey: string
  ) {
    this.isLoading = true;
    const translateId = this.portal?.translates.find(
      (el) => el.locale === this.locale
    )?.id;

    let request: Observable<unknown>;
    const newTranslates: Record<string, string> = {};
    newTranslates[data.key] = data.value.replace(/"/g, '');

    if (!translateId || !this.ruTranslate) {
      this.alertService.open('translateId is not defined!', {
        status: TuiNotification.Error,
      });
      return;
    }

    if (this.locale === 'ru') {
      if (oldKey !== data.key) {
        delete this.ruTranslate[oldKey];
        this.ruTranslate[data.key] = data.value.replace(/"/g, '');
        request = this.translateService.addOrPatchKey({
          id: translateId,
          newTranslates,
          oldKeys: [oldKey],
        });
      } else {
        this.ruTranslate[data.key] = data.value.replace(/"/g, '');
        request = this.translateService.addOrPatchKey({
          id: translateId,
          newTranslates,
        });
      }
    } else if (this.compareTranslate && data.changeValue) {
      const correctValue = data.changeValue.replace(/"/g, '');
      this.compareTranslate[data.key] = correctValue;
      newTranslates[data.key] = correctValue;
      request = this.translateService.addOrPatchKey({
        id: translateId,
        newTranslates,
      });
    } else return;

    request.subscribe({
      next: (res) => {
        console.log(res);
        this.alertService
          .open('Success edited!', {
            status: TuiNotification.Success,
          })
          .subscribe();
        this.isLoading = false;
        this.portalsService.getMemoPortals().subscribe(() => {
          this.init();
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
        this.alertService.open(err.message.message, {
          status: TuiNotification.Error,
        });
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private addNewKey(newTranslates: Record<string, string>) {
    this.isLoading = true;
    const id = this.portal?.translates.find((el) => el.locale === 'ru')?.id;

    if (!id) {
      return;
    }

    this.translateService
      .addOrPatchKey({
        id,
        newTranslates,
      })
      .subscribe({
        next: (res) => {
          this.alertService
            .open(`Ключ добавлен!`, {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.isLoading = false;
          this.portalsService.getMemoPortals().subscribe(() => {
            this.init();
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.log(err);
          this.alertService.open(err.message.message, {
            status: TuiNotification.Error,
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }

  private updateTranslateWithJson(json: string, locale: string) {
    this.isLoading = true;

    const id = this.portal?.translates.find((el) => el.locale === locale)?.id;
    if (!id) {
      console.error('Translate is not defined!');
      return;
    }

    this.translateService
      .editTranslateFromJson({
        id,
        translates: JSON.parse(json),
      })
      .subscribe({
        next: (res) => {
          this.alertService
            .open(`Переводы: ${locale} обновлены!`, {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.isLoading = false;
          this.portalsService.getMemoPortals().subscribe(() => {
            this.init();
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.alertService.open(err.message.message, {
            status: TuiNotification.Error,
          });
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }
}
