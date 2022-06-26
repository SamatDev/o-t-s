import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-add-new-key',
  templateUrl: './add-new-key.component.html',
  styleUrls: ['./add-new-key.component.scss'],
})
export class AddNewKeyComponent implements OnInit {
  form = new FormGroup({
    key: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, any>
  ) {}

  ngOnInit(): void {}

  add(event: Event) {
    event.preventDefault();
    if (this.form.invalid) return;
    const { key, value } = this.form.value;
    this.context.completeWith({
      key: key.trim(),
      value: value.replace(/"/g, ''),
    });
  }
}
