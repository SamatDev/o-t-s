import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLangLocaleComponent } from './add-lang-locale.component';

describe('AddLangLocaleComponent', () => {
  let component: AddLangLocaleComponent;
  let fixture: ComponentFixture<AddLangLocaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLangLocaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLangLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
