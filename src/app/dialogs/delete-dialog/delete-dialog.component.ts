import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  template: `<p>Действие не обратимо!</p>
    <p>Продолжить?</p>
    <button
      tuiButton
      type="button"
      size="m"
      class="tui-space_right-3"
      (click)="context.completeWith({ result: true, pass: this.pass })"
    >
      Да
    </button>
    <button
      tuiButton
      type="button"
      size="m"
      (click)="context.completeWith({ result: false })"
    >
      Отмена
    </button>`,
  styles: [],
  selector: 'dialog-delete',
})
export class DialogDeleteComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<any, any>
  ) {}

  pass?: string;
}
