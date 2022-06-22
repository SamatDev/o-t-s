import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { ITranslateDto, PortalsLangs } from '../interfaces/types';
import { ApiService } from './api.service';

@Injectable()
export class TranslateServerService {
  constructor(private api: ApiService) {}

  langs: PortalsLangs[] = [];

  uploadLangs() {
    this.getAllLangs().subscribe(
      (res) => (this.langs = res.sort((a, b) => a.id - b.id))
    );
  }

  getFrontendTranslates(lang: string): Observable<Record<string, string>> {
    const url = `/translates/frontend/${lang}`;
    return this.api.get(url);
  }

  getGamesTranslates(lang: string): Observable<Record<string, string>> {
    const url = `/translates/games/${lang}`;
    return this.api.get(url);
  }

  updateTranslate(data: ITranslateDto) {
    return this.api.put('/translates/update', data);
  }

  addLang(data: ITranslateDto) {
    return this.api.post('/translates/add-lang', data);
  }

  getAllLangs(): Observable<PortalsLangs[]> {
    return this.api.get('/langs');
  }

  changeLang(data: Partial<PortalsLangs>) {
    return this.api.put('/langs', data);
  }

  addLangLocale(data: Partial<PortalsLangs>) {
    this.addLang({
      lang: data.lang!,
      translates: {},
      type: 'frontend',
    })
      .pipe(first())
      .subscribe();

    this.addLang({
      lang: data.lang!,
      translates: {},
      type: 'games',
    })
      .pipe(first())
      .subscribe();

    return this.api.post('/langs', data);
  }

  deleteLang(portal: string, lang: string) {
    return this.api.delete(`/${portal}/${lang}`);
  }
}
