import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleEditorComponent } from './locale-editor.component';

describe('LocaleEditorComponent', () => {
  let component: LocaleEditorComponent;
  let fixture: ComponentFixture<LocaleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
