import { Component, OnInit } from '@angular/core';
import { PortalsLangs } from 'src/app/core/interfaces/types';
import { TranslateServerService } from 'src/app/core/services/translate-service.service';

@Component({
  selector: 'app-locale-editor',
  templateUrl: './locale-editor.component.html',
  styleUrls: ['./locale-editor.component.scss'],
})
export class LocaleEditorComponent {
  constructor(private service: TranslateServerService) {}

  get langs() {
    return this.service.langs;
  }

  changeLocale(lang: PortalsLangs) {
    this.service
      .changeLang(lang)
      .subscribe((res) => this.service.uploadLangs());
  }
}
