import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  @ViewChild('inputEl', { static: false }) inputEl!: ElementRef<HTMLInputElement>;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() id = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() errorMessage = '';
  @Input() isInvalid = false;
  @Input() readonly = false;
  @Input() value = '';
  @Output() input = new EventEmitter<Event>();

  onChange: any = () => {};
  onTouch: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && changes['value'].currentValue !== undefined) {
      this.value = changes['value'].currentValue;
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
    this.input.emit(event);
  }

  onBlur(): void {
    this.onTouch();
  }

  focus(): void {
    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
  }
}
