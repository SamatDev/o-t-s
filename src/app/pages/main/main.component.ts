import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PortalsService } from 'src/app/core/services/portals.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    translates: new FormControl('{}'),
  });

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private readonly portalsService: PortalsService
  ) {}

  isShowForm: boolean = false;

  ngOnInit(): void {}

  addPortal() {
    if (this.form.invalid) return;
    const { name, path, translates } = this.form.value;
    this.portalsService
      .addPortal({
        name,
        path,
        lang: { active: true, locale: 'ru', label: 'Русский' },
        translate: { locale: 'ru', translates: JSON.parse(translates) },
      })
      .subscribe(
        (res) => {
          this.portalsService.getMemoPortals();
          this.isShowForm = false;
          this.alertService
            .open('Портал добавен', { status: TuiNotification.Success })
            .subscribe();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  openFr = false;
  openG = false;
}
