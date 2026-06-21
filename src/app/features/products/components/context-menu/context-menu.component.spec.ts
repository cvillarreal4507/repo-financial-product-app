import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContextMenuComponent } from './context-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ ContextMenuComponent ]
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
