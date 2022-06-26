import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewKeyComponent } from './add-new-key.component';

describe('AddNewKeyComponent', () => {
  let component: AddNewKeyComponent;
  let fixture: ComponentFixture<AddNewKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
