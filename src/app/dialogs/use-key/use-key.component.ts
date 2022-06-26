import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject } from 'rxjs';

type DataType = {
  key: string;
  value: string;
  lang: string;
  path: string;
  portal: string;
  changeValue: string;
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

  form!: FormGroup;
  mode: 'changeRu' | 'changeAny' = 'changeAny';
  get isChangeAny() {
    return this.form.get('changeValue') === null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data.next(this.context.data);
      this.form = this.initForm();

      console.log(this.context.data);
      if (this.context.data.changeValue !== null) {
        this.form.addControl(
          'changeValue',
          new FormControl(this.context.data.changeValue, Validators.required)
        );
        this.mode = 'changeAny';
      } else this.mode = 'changeRu';
      console.log(this.form);
      this.cdr.markForCheck();
    });
  }

  save() {
    this.context.completeWith({
      ...this.form.value,
    });
  }

  private initForm() {
    return new FormGroup({
      key: new FormControl(this.context.data.key),
      value: new FormControl(this.context.data.value, Validators.required),
    });
  }
}
