import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { PortalObj } from 'src/app/core/interfaces/types';
import { PortalsService } from '../../services/portals.service';

const STRINGIFY_EMPLOYEE: TuiStringHandler<{
  key: string;
  value: PortalObj;
}> = (portal: { key: string; value: PortalObj }) => `${portal.value.name}`;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiItemsHandlersProvider({ stringify: STRINGIFY_EMPLOYEE })],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private portalsService: PortalsService) {}

  get portals() {
    return this.portalsService.portals;
  }

  ngOnInit(): void {}
}
