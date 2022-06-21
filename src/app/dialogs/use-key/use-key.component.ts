import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateTypes } from 'src/app/core/interfaces/types';

type DataType = {
  key: string;
  value: string;
  project: TranslateTypes;
  lang: string;
  mode: 'changeAny' | 'changeRu' | 'addRu';
  changeValue: string | null;
};

@Component({
  selector: 'app-use-key',
  templateUrl: './use-key.component.html',
  styleUrls: ['./use-key.component.scss'],
})
export class UseKeyComponent implements AfterViewInit {
  public data: BehaviorSubject<DataType | null> =
    new BehaviorSubject<DataType | null>(null);
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, DataType>,
    private cdr: ChangeDetectorRef
  ) {}

  get mode() {
    return this.context.data.mode;
  }

  form!: FormGroup;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data.next(this.context.data);
      this.form = this.initForm(this.context.data.mode);
      this.cdr.markForCheck();
    });
  }

  save() {
    switch (this.mode) {
      case 'changeAny': {
        if (this.form.invalid) return;
        const { lang, project, mode, key } = this.context.data;
        const data = {
          key,
          mode: this.mode,
          lang,
          project,
          ...this.form.value,
        };
        this.context.completeWith(data);
        break;
      }

      case 'changeRu': {
        if (this.form.invalid) return;
        const { lang, project, mode, key } = this.context.data;
        const data = {
          mode: this.mode,
          lang,
          project,
          ...this.form.value,
          oldKey: key,
        };
        console.log(data);
        this.context.completeWith(data);
        break;
      }

      case 'addRu': {
        if (this.form.invalid) return;
        const { lang, project, mode, key } = this.context.data;
        const data = {
          project,
          lang,
          mode: this.mode,
          ...this.form.value,
        };
        this.context.completeWith(data);
        break;
      }
    }
  }

  initForm(mode: 'changeAny' | 'changeRu' | 'addRu') {
    switch (mode) {
      case 'addRu': {
        return new FormGroup({
          key: new FormControl('', Validators.required),
          value: new FormControl('', Validators.required),
        });
      }

      case 'changeAny': {
        return new FormGroup({
          value: new FormControl(
            this.context.data.changeValue,
            Validators.required
          ),
        });
      }

      case 'changeRu': {
        return new FormGroup({
          key: new FormControl(this.context.data.key),
          value: new FormControl(this.context.data.value, Validators.required),
        });
      }
    }
  }
}
