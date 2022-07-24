import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

export interface TranslateComment {
  id?: number;
  translateId: number;
  key: string;
  comment: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslateCommentsService {
  constructor(private api: ApiService) {}

  public readonly $onCommented: Subject<void> = new Subject();

  getCommentsByTranslateId(
    translateId: number
  ): Observable<TranslateComment[]> {
    return this.api.get(`/translate-comments/${translateId}`);
  }

  addComment(data: TranslateComment): Observable<TranslateComment> {
    return this.api.post('/translate-comments/', data);
  }

  updateComment(data: TranslateComment): Observable<TranslateComment> {
    return this.api.put('/translate-comments/', data);
  }

  deleteCommentById(id: number) {
    return this.api.delete(`/translate-comments/${id}`);
  }
}
