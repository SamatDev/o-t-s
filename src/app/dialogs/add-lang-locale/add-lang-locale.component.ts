import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add-lang-locale',
  templateUrl: './add-lang-locale.component.html',
  styleUrls: ['./add-lang-locale.component.scss'],
})
export class AddLangLocaleComponent implements OnInit {
  form = new FormGroup({
    lang: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ]),
    portal: new FormControl('games-mindskills', Validators.required),
    active: new FormControl(false, Validators.required),
    label: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  ngOnInit(): void {}

  add(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;
    this.context.completeWith(this.form.value);
  }
}
