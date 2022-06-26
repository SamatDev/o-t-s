import { Injectable } from '@angular/core';
import { CreateTranslateDto, Translate } from '../interfaces/types';
import { ApiService } from './api.service';

@Injectable()
export class TranslatesService {
  constructor(private api: ApiService) {}

  getTranslates() {
    return this.api.get('/translates');
  }

  getTranslate(path: string, locale: string) {
    return this.api.get(`/translates/${path}/${locale}`);
  }

  addTranslate(data: CreateTranslateDto) {
    return this.api.post('/translates', data);
  }

  editTranslate(data: Partial<Translate>) {
    return this.api.put('/translates', data);
  }
}
