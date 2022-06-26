import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranslateJsonComponent } from './edit-translate-json.component';

describe('EditTranslateJsonComponent', () => {
  let component: EditTranslateJsonComponent;
  let fixture: ComponentFixture<EditTranslateJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTranslateJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTranslateJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
