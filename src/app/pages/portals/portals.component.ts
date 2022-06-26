import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Injector,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { BehaviorSubject, first } from 'rxjs';
import { Lang } from 'src/app/core/interfaces/types';
import { AuthService } from 'src/app/core/services/auth.service';
import { PortalsService } from 'src/app/core/services/portals.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddLangLocaleComponent } from 'src/app/dialogs/add-lang-locale/add-lang-locale.component';
import { LangsService } from 'src/app/core/services/langs.service';
import { DialogDeleteComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { EditLangDialogComponent } from 'src/app/dialogs/edit-lang-dialog/edit-lang-dialog.component';

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalsComponent implements OnInit {
  readonly langs: BehaviorSubject<readonly Lang[]> = new BehaviorSubject<
    readonly Lang[]
  >([]);
  readonly columns: string[] = ['label', 'locale', 'active', 'actions'];
  portalInfo?: {
    id: number;
    name: string;
  };
  constructor(
    private portalsService: PortalsService,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private authService: AuthService,
    private dialog: TuiDialogService,
    private alert: TuiAlertService,
    private langsService: LangsService,
    private router: Router,
    @Inject(Injector) private readonly injector: Injector,
    private cdr: ChangeDetectorRef
  ) {}

  get portals() {
    return this.portalsService._portals.getValue();
  }

  get isSuper() {
    return this.authService.isSuper;
  }

  path!: string;

  ngOnInit(): void {
    this.portalsService.getMemoPortals();

    this.activatedRoute.params.subscribe((params) => {
      this.path = params['path'];
      if (!this.path) this.router.navigate(['..']);
      this.init();
    });
  }

  openAddLangDialog() {
    if (!this.portalInfo) {
      this.alert
        .open('No info of portal!', { status: TuiNotification.Error })
        .subscribe();
      return;
    }
    this.dialog
      .open(new PolymorpheusComponent(AddLangLocaleComponent, this.injector), {
        data: {
          portalInfo: this.portalInfo,
        },
      })
      .subscribe((res) => {
        if (Boolean(res)) {
          this.alert
            .open('Succes deleted!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          const langs = [...this.langs.getValue()];
          langs.push(res! as Lang);
          this.langs.next(langs);
          this.portalsService.getMemoPortals();
        }
      });
  }

  editLang(item: Lang) {
    this.dialog
      .open(new PolymorpheusComponent(EditLangDialogComponent, this.injector), {
        data: item,
      })
      .subscribe((result) => {
        if (result! as boolean | Lang) {
          this.portalsService.getMemoPortals();
          setTimeout(() => {
            this.init();
          });
        }
      });
  }

  deleteLang(id: number) {
    this.dialog
      .open(new PolymorpheusComponent(DialogDeleteComponent, this.injector))
      .subscribe((res) => {
        if (Boolean((res! as { result: boolean; pass?: string }).result)) {
          this.langsService.deteleLang(id, (res as any).pass).subscribe({
            next: (res) => {
              this.alert
                .open('Succes deleted!', {
                  status: TuiNotification.Warning,
                })
                .subscribe();
              this.portalsService.getMemoPortals();
              setTimeout(() => this.init());
            },
            error: (err) =>
              this.alert
                .open(err.message, { status: TuiNotification.Error })
                .subscribe(),
          });
        }
      });
  }

  isLoading: boolean = false;

  private init() {
    this.isLoading = true;
    this.portalsService._portals
      .pipe(first((portals) => !!portals[this.path]))
      .subscribe((portals) => {
        const portal = portals[this.path];
        if (!portal) {
          this.router.navigateByUrl('');
          return;
        }
        this.portalInfo = {
          id: portal.id,
          name: portal.name,
        };
        this.langs.next(portal.langs);
        this.alert
          .open('Content updated', { status: TuiNotification.Info })
          .subscribe();
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }
}
