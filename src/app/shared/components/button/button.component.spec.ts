import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event when clicked and not disabled/loading', () => {
    const emitSpy = jest.spyOn(component.btnClick, 'emit');
    const mockEvent = new MouseEvent('click');
    component.onClick(mockEvent);
    expect(emitSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should NOT emit click event when disabled', () => {
    const emitSpy = jest.spyOn(component.btnClick, 'emit');
    component.disabled = true;
    component.onClick(new MouseEvent('click'));
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should NOT emit click event when loading', () => {
    const emitSpy = jest.spyOn(component.btnClick, 'emit');
    component.loading = true;
    component.onClick(new MouseEvent('click'));
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should apply button variant class', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const buttonEl = fixture.nativeElement.querySelector('button');
    expect(buttonEl.classList.contains('btn-secondary')).toBe(true);
  });

  it('should show loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });
});
