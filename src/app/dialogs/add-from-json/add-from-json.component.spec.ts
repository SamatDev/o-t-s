import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFromJsonComponent } from './add-from-json.component';

describe('AddFromJsonComponent', () => {
  let component: AddFromJsonComponent;
  let fixture: ComponentFixture<AddFromJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFromJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFromJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
