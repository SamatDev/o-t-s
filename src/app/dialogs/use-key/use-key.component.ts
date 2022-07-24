import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiEditorTool } from '@taiga-ui/addon-editor';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  TranslateComment,
  TranslateCommentsService,
} from 'src/app/core/services/translate-comments.service';

type DataType = {
  key: string;
  value: string;
  lang: string;
  path: string;
  portal: string;
  changeValue: string;
  comment: TranslateComment | null;
  ruTranslateId: number;
};

@Component({
  selector: 'app-use-key',
  templateUrl: './use-key.component.html',
  styleUrls: ['./use-key.component.scss'],
})
export class UseKeyComponent implements AfterViewInit {
  public data: BehaviorSubject<DataType | null> =
    new BehaviorSubject<DataType | null>(null);

  isAddingComment: boolean = false;
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<any, DataType>,
    private cdr: ChangeDetectorRef,
    private translateCommentsService: TranslateCommentsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private alert: TuiAlertService
  ) {}

  get isSuper() {
    return this.authService.isSuper;
  }

  comment?: TranslateComment;
  form!: FormGroup;
  commentForm?: FormGroup;
  mode: 'changeRu' | 'changeAny' = 'changeAny';
  isShowAddCommentForm: boolean = false;

  get isChangeAny() {
    return this.form.get('changeValue') === null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.comment = this.context.data.comment || undefined;
      this.data.next(this.context.data);
      this.form = this.initForm();

      if (this.context.data.changeValue !== null) {
        this.form.addControl(
          'changeValue',
          new FormControl(this.context.data.changeValue, Validators.required)
        );
        this.mode = 'changeAny';
      } else this.mode = 'changeRu';
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
  showCommentForm() {
    this.isShowAddCommentForm = true;
    this.commentForm = this.fb.group({
      comment: [this.comment ? this.comment.comment : ''],
    });
  }

  saveComment() {
    const comment = this.commentForm?.get('comment')?.value as string;
    if (!comment) return;

    if (!this.comment) {
      const data: TranslateComment = {
        comment,
        translateId: this.context.data.ruTranslateId,
        key: this.context.data.key,
      };
      this.isAddingComment = true;
      this.translateCommentsService.addComment(data).subscribe(
        (res) => {
          this.comment = res;
          this.isShowAddCommentForm = false;
          this.translateCommentsService.$onCommented.next(void 0);
          this.isAddingComment = false;
          this.cdr.markForCheck();
          this.alert
            .open('Комментарий добавлен!', {
              status: TuiNotification.Success,
            })
            .subscribe();
        },
        (err) =>
          this.alert
            .open('Ошибка при добавлении комментария!', {
              status: TuiNotification.Error,
            })
            .subscribe()
      );
    } else {
      const data: TranslateComment = {
        comment,
        translateId: this.context.data.ruTranslateId,
        key: this.context.data.key,
      };
      this.isAddingComment = true;
      this.translateCommentsService.updateComment(data).subscribe(
        (res: TranslateComment) => {
          this.comment = { ...res };
          this.isShowAddCommentForm = false;
          this.translateCommentsService.$onCommented.next(void 0);
          this.isAddingComment = false;
          this.cdr.markForCheck();

          this.alert
            .open('Комментарий добавлен!', {
              status: TuiNotification.Success,
            })
            .subscribe();
        },
        (err) =>
          this.alert
            .open('Ошибка при редактировании!', {
              status: TuiNotification.Error,
            })
            .subscribe()
      );
    }
  }
  deleteComment() {
    if (this.comment?.id)
      this.translateCommentsService
        .deleteCommentById(this.comment?.id)
        .subscribe(() => {
          this.translateCommentsService.$onCommented.next(void 0);
          this.comment = undefined;
          this.alert
            .open('Комментарий удален!', {
              status: TuiNotification.Warning,
            })
            .subscribe();
        });
  }
  cancelComment() {
    this.isShowAddCommentForm = false;
  }

  public readonly tools: ReadonlyArray<TuiEditorTool> = [
    TuiEditorTool.Bold,
    TuiEditorTool.Italic,
    TuiEditorTool.Strikethrough,
    TuiEditorTool.Undo,
    TuiEditorTool.Underline,
    TuiEditorTool.HR,
    TuiEditorTool.Color,
    TuiEditorTool.Link,
    TuiEditorTool.Hilite,
  ];
}
