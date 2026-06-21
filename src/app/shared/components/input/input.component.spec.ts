import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on writeValue', () => {
    component.writeValue('Test Value');
    expect(component.value).toBe('Test Value');
  });

  it('should call registered onChange callback when input changes', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    
    const mockEvent = { target: { value: 'New Value' } } as unknown as Event;
    component.onInput(mockEvent);
    
    expect(component.value).toBe('New Value');
    expect(onChangeSpy).toHaveBeenCalledWith('New Value');
  });

  it('should call registered onTouched callback on blur', () => {
    const onTouchSpy = jest.fn();
    component.registerOnTouched(onTouchSpy);
    component.onBlur();
    expect(onTouchSpy).toHaveBeenCalled();
  });

  it('should update disabled state', () => {
    component.setDisabledState?.(true);
    expect(component.disabled).toBe(true);
  });

  it('should display error message when isInvalid is true', () => {
    component.isInvalid = true;
    component.errorMessage = 'This field is required';
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.error-message');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('This field is required');
  });

  it('should apply is-invalid class when isInvalid is true', () => {
    component.isInvalid = true;
    fixture.detectChanges();
    const containerEl = fixture.nativeElement.querySelector('.input-container');
    expect(containerEl.classList.contains('is-invalid')).toBe(true);
  });
});
