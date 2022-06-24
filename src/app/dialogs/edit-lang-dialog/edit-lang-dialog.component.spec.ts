import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLangDialogComponent } from './edit-lang-dialog.component';

describe('EditLangDialogComponent', () => {
  let component: EditLangDialogComponent;
  let fixture: ComponentFixture<EditLangDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLangDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLangDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
