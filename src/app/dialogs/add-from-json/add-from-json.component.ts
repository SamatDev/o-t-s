import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { TranslateTypes } from 'src/app/core/interfaces/types';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add-from-json',
  templateUrl: './add-from-json.component.html',
  styleUrls: ['./add-from-json.component.scss'],
})
export class AddFromJsonComponent implements OnInit {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<
      any,
      {
        langs: any;
        projects: any;
      }
    >
  ) {}
  form = new FormGroup({
    lang: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    json: new FormControl('', Validators.required),
  });

  get langs() {
    return;
  }

  isLoading: boolean = false;

  ngOnInit(): void {}

  onClick() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const { lang, json, project } = this.form.value;
    const data = { lang, type: project, translates: json };
  }
}
