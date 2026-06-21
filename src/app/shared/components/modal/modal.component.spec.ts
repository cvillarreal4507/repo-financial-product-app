import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event onConfirm', () => {
    const emitSpy = jest.spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit cancel event onCancel', () => {
    const emitSpy = jest.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should display the modal card when isOpen is true', () => {
    component.isOpen = true;
    component.title = 'Confirm Delete';
    fixture.detectChanges();
    
    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    const title = fixture.nativeElement.querySelector('.modal-title');
    
    expect(overlay).toBeTruthy();
    expect(title.textContent).toContain('Confirm Delete');
  });

  it('should hide the modal card when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    expect(overlay).toBeNull();
  });
});
