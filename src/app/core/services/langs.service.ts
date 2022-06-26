import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateLangDto, Lang } from '../interfaces/types';
import { ApiService } from './api.service';

@Injectable()
export class LangsService {
  constructor(private api: ApiService, private alertService: TuiAlertService) {}

  portalLangs: BehaviorSubject<Lang[]> = new BehaviorSubject<Lang[]>([]);

  updatePortalLangs(id: number) {
    this.getPortalLangs(id).subscribe({
      next: (res) => this.portalLangs.next(res),
      error: (err) =>
        this.alertService
          .open(err.message, { status: TuiNotification.Error })
          .subscribe(),
    });
  }

  getPortalLangs(id: number): Observable<Lang[]> {
    return this.api.get(`/langs/${id}`);
  }

  editLang(data: {
    id: number;
    locale: string;
    active: boolean;
    label: string;
  }) {
    return this.api.put('/langs', data);
  }

  addLang(data: CreateLangDto): Observable<Lang> {
    return this.api.post('/langs', data);
  }

  deteleLang(id: number, pass: string) {
    return this.api.delete(`/langs/${id}`);
  }
}
