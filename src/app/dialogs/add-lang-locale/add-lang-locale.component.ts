import {
  AfterViewInit,
  Component,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { first } from 'rxjs';
import { LangsService } from 'src/app/core/services/langs.service';

@Component({
  selector: 'app-add-lang-locale',
  templateUrl: './add-lang-locale.component.html',
  styleUrls: ['./add-lang-locale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLangLocaleComponent implements AfterViewInit {
  form = new FormGroup({
    locale: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
    ]),
    portalId: new FormControl(null, Validators.required),
    active: new FormControl(false, Validators.required),
    label: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>,
    private cdr: ChangeDetectorRef,
    private langsService: LangsService,
    private alert: TuiAlertService
  ) {}

  portalInfo?: { id: number; name: string };
  isLoading: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.portalInfo = this.context.data['portalInfo'];
      this.form.get('portalId')?.setValue(this.context.data['portalInfo'].id);
      this.cdr.markForCheck();
    });
  }

  add(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;
    this.isLoading = true;
    this.langsService.addLang(this.form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.context.completeWith(res);
      },
      error: (err) => {
        this.isLoading = false;
        this.alert
          .open(err.message, { status: TuiNotification.Error })
          .pipe(first())
          .subscribe();
      },
    });
  }
}
