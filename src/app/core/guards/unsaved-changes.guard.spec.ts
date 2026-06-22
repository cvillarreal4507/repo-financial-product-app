import { TestBed } from '@angular/core/testing';
import { UnsavedChangesGuard, CanComponentDeactivate } from './unsaved-changes.guard';

describe('UnsavedChangesGuard', () => {
  let guard: UnsavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedChangesGuard]
    });
    guard = TestBed.inject(UnsavedChangesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if component does not implement canDeactivate', () => {
    const component = {} as any;
    const result = guard.canDeactivate(component);
    expect(result).toBe(true);
  });

  it('should delegate to component canDeactivate and return true', () => {
    const mockComponent: CanComponentDeactivate = {
      canDeactivate: jest.fn().mockReturnValue(true)
    };

    const result = guard.canDeactivate(mockComponent);
    expect(result).toBe(true);
    expect(mockComponent.canDeactivate).toHaveBeenCalled();
  });

  it('should delegate to component canDeactivate and return false', () => {
    const mockComponent: CanComponentDeactivate = {
      canDeactivate: jest.fn().mockReturnValue(false)
    };

    const result = guard.canDeactivate(mockComponent);
    expect(result).toBe(false);
    expect(mockComponent.canDeactivate).toHaveBeenCalled();
  });
});
