import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isOpen state when toggle is called', () => {
    expect(component.isOpen).toBe(false);
    component.toggle();
    expect(component.isOpen).toBe(true);
    component.toggle();
    expect(component.isOpen).toBe(false);
  });

  it('should set isOpen to false when close is called', () => {
    component.isOpen = true;
    component.close();
    expect(component.isOpen).toBe(false);
  });

  it('should close dropdown when document is clicked outside', () => {
    component.isOpen = true;
    
    // Simulate document click on an external element
    const externalEl = document.createElement('div');
    const mockEvent = { target: externalEl } as unknown as Event;
    component.onClickOutside(mockEvent);
    
    expect(component.isOpen).toBe(false);
  });

  it('should NOT close dropdown when document is clicked inside trigger/menu', () => {
    component.isOpen = true;
    
    // Simulate document click on element inside dropdown container
    const mockEvent = { target: fixture.nativeElement } as unknown as Event;
    component.onClickOutside(mockEvent);
    
    expect(component.isOpen).toBe(true);
  });
});
