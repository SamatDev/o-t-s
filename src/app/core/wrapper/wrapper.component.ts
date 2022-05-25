import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  constructor() {}

  get isLoginPage() {
    return !!window.location.href.includes('login');
  }

  ngOnInit(): void {}
}
