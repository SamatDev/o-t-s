import { Injectable } from '@angular/core';
import { ITranslateDto } from '../interfaces/types';
import { ApiService } from './api.service';

@Injectable()
export class TranslateServerService {
  constructor(private api: ApiService) {}

  getFrontendTranslates(lang: string) {
    const url = `/frontend/${lang}`;
    return this.api.get(url);
  }

  getGamesTranslates(lang: string) {
    const url = `/games/${lang}`;
    return this.api.get(url);
  }

  updateTranslate(data: ITranslateDto) {
    return this.api.put('/update', data);
  }

  addLang(data: ITranslateDto) {
    return this.api.post('/add-lang', data);
  }
}
