import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-edit-translate-json',
  templateUrl: './edit-translate-json.component.html',
  styleUrls: ['./edit-translate-json.component.scss'],
})
export class EditTranslateJsonComponent implements OnInit {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      { json: any } | null,
      { json: any; locale: string }
    >
  ) {}
  form = new FormGroup({
    json: new FormControl(null, Validators.required),
    locale: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.form.setValue(this.context.data);
  }

  save(event: Event) {
    if (this.form.invalid) return;
    event.preventDefault();
    this.context.completeWith(this.form.value);
  }
}
