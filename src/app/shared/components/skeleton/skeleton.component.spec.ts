import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate styles correctly for rectangle', () => {
    component.width = '200px';
    component.height = '30px';
    component.shape = 'rectangle';
    
    const styles = component.getStyles();
    expect(styles['width']).toBe('200px');
    expect(styles['height']).toBe('30px');
    expect(styles['border-radius']).toBe('var(--radius-sm)');
  });

  it('should calculate styles correctly for circle', () => {
    component.width = '50px';
    component.height = '50px';
    component.shape = 'circle';
    
    const styles = component.getStyles();
    expect(styles['width']).toBe('50px');
    expect(styles['height']).toBe('50px');
    expect(styles['border-radius']).toBe('50%');
  });
});
