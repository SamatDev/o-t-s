import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get user() {
    return this.authService.user;
  }

  logout() {
    this.authService.logout();
  }
}
