import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatesComponent } from './translates.component';

describe('TranslatesComponent', () => {
  let component: TranslatesComponent;
  let fixture: ComponentFixture<TranslatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
