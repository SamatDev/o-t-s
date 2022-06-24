import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TuiDialogContext,
  TuiAlertService,
  TuiNotification,
} from '@taiga-ui/core';
import { LangsService } from 'src/app/core/services/langs.service';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CreateLangDto, Lang } from 'src/app/core/interfaces/types';

@Component({
  selector: 'app-edit-lang-dialog',
  templateUrl: './edit-lang-dialog.component.html',
  styleUrls: ['./edit-lang-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLangDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    locale: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
    ]),
    id: new FormControl(null, Validators.required),
    active: new FormControl(false, Validators.required),
    label: new FormControl('', Validators.required),
  });
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, Lang>,
    private cdr: ChangeDetectorRef,
    private langsService: LangsService,
    private alert: TuiAlertService
  ) {}

  ngOnInit() {
    this.form.setValue(this.context.data);

    setTimeout(() => console.log(this.form), 1000);
  }

  isLoading: boolean = false;

  save(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;
    this.isLoading = true;
    this.langsService.editLang(this.form.value).subscribe({
      next: (res) => {
        this.alert
          .open('Lang saved', { status: TuiNotification.Success })
          .subscribe();
        this.context.completeWith(res);
        this.isLoading = false;
      },
      error: (err) => {
        this.alert
          .open(err.message, { status: TuiNotification.Error })
          .subscribe();
        this.isLoading = false;
      },
    });
  }
}
