import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextMenuComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event onEdit', () => {
    const editSpy = jest.spyOn(component.edit, 'emit');
    component.onEdit();
    expect(editSpy).toHaveBeenCalled();
  });

  it('should emit delete event onDelete', () => {
    const deleteSpy = jest.spyOn(component.delete, 'emit');
    component.onDelete();
    expect(deleteSpy).toHaveBeenCalled();
  });
});
