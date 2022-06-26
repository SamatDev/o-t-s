import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { CreatePortalDto, Portal, Portals } from '../interfaces/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PortalsService {
  constructor(private api: ApiService, private alertService: TuiAlertService) {
    this.getMemoPortals();
  }

  _portals: BehaviorSubject<Portals> = new BehaviorSubject({});

  get portals() {
    return this._portals.pipe(shareReplay());
  }

  getMemoPortals() {
    this.api.get<Portals>('/portals/fast').subscribe({
      next: (res) => this._portals.next(res),
      error: (err) => {
        console.log(err);
        this.alertService
          .open(err.message, { status: TuiNotification.Error })
          .subscribe();
      },
    });
  }

  getPortals(): Observable<Portal[]> {
    return this.api.get('/portals');
  }

  addPortal(data: CreatePortalDto) {
    return this.api.post('/portals', data);
  }

  editPortal(data: { id: string; name: string; path: string }) {
    return this.api.put('/portals', data);
  }
}
