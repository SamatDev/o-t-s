import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseKeyComponent } from './use-key.component';

describe('UseKeyComponent', () => {
  let component: UseKeyComponent;
  let fixture: ComponentFixture<UseKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
