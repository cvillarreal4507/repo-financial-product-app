import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormComponent } from './form.component';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockProductService: jest.Mocked<any>;
  let mockRouter: any;
  let mockActivatedRoute: any;

  const mockProduct: Product = {
    id: 'prod-123',
    name: 'Standard Card Product',
    description: 'Product description is valid and longer than 10 characters',
    logo: 'logo.png',
    date_release: '2026-06-20T00:00:00.000Z',
    date_revision: '2027-06-20T00:00:00.000Z'
  };

  beforeEach(async () => {
    mockProductService = {
      getProduct: jest.fn().mockReturnValue(of(mockProduct)),
      verifyProductExists: jest.fn().mockReturnValue(of(false)),
      createProduct: jest.fn().mockReturnValue(of({ message: 'Success', data: mockProduct })),
      updateProduct: jest.fn().mockReturnValue(of({ message: 'Success', data: mockProduct }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(null) // default is add mode
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ FormComponent ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create in add mode by default', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.isEditMode).toBe(false);
    expect(component.form.get('id')?.disabled).toBe(false);
  });

  it('should create in edit mode and load product details', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('prod-123');
    fixture.detectChanges();

    expect(component.isEditMode).toBe(true);
    expect(component.productId).toBe('prod-123');
    expect(mockProductService.getProduct).toHaveBeenCalledWith('prod-123');
    expect(component.form.get('id')?.disabled).toBe(true);
    expect(component.form.get('name')?.value).toBe(mockProduct.name);
  });

  it('should navigate back on error loading product details in edit mode', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('prod-123');
    mockProductService.getProduct.mockReturnValue(throwError(() => new Error('Error')));
    fixture.detectChanges();

    expect(component.isLoadingProduct).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
    consoleSpy.mockRestore();
  });

  it('should validate ID asynchronously (exists/not exists)', fakeAsync(() => {
    fixture.detectChanges();
    const idControl = component.form.get('id');

    // Simulate mock service returning duplicate ID
    mockProductService.verifyProductExists.mockReturnValue(of(true));
    idControl?.setValue('prod-999');
    idControl?.updateValueAndValidity();
    tick();

    expect(idControl?.hasError('idExists')).toBe(true);

    // Simulate mock service returning valid non-duplicate ID
    mockProductService.verifyProductExists.mockReturnValue(of(false));
    idControl?.setValue('prod-777');
    idControl?.updateValueAndValidity();
    tick();

    expect(idControl?.hasError('idExists')).toBe(false);
  }));

  it('should validate release date (>= today)', () => {
    fixture.detectChanges();
    const releaseControl = component.form.get('date_release');

    const getLocalDateStr = (d: Date) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    // Set release date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateStr(yesterday);

    releaseControl?.setValue(yesterdayStr);
    expect(releaseControl?.hasError('invalidReleaseDate')).toBe(true);

    // Set release date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = getLocalDateStr(tomorrow);

    releaseControl?.setValue(tomorrowStr);
    expect(releaseControl?.hasError('invalidReleaseDate')).toBe(false);
  });

  it('should calculate revision date as +1 year automatically', () => {
    fixture.detectChanges();
    const releaseControl = component.form.get('date_release');
    const revisionControl = component.form.get('date_revision');

    releaseControl?.setValue('2026-06-20');
    expect(revisionControl?.value).toBe('2027-06-20');

    releaseControl?.setValue('2026-02-28');
    expect(revisionControl?.value).toBe('2027-02-28');
  });

  it('should trigger submit createProduct in add mode', () => {
    fixture.detectChanges();
    
    // Fill in valid details
    component.form.get('id')?.setValue('p123');
    component.form.get('name')?.setValue('Product Name Valid');
    component.form.get('description')?.setValue('Product description description description');
    component.form.get('logo')?.setValue('http://logo.png');
    component.form.get('date_release')?.setValue('2026-06-20');
    
    expect(component.form.valid).toBe(true);
    component.onSubmit();

    expect(mockProductService.createProduct).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should trigger submit updateProduct in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('prod-123');
    fixture.detectChanges();
    
    // Form is loaded from mock, let's update name
    component.form.get('name')?.setValue('Updated Product Name');
    
    expect(component.form.valid).toBe(true);
    component.onSubmit();

    expect(mockProductService.updateProduct).toHaveBeenCalledWith('prod-123', expect.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should handle service errors gracefully during save', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fixture.detectChanges();
    mockProductService.createProduct.mockReturnValue(throwError(() => new Error('Save Error')));
    
    // Fill in valid details
    component.form.get('id')?.setValue('p123');
    component.form.get('name')?.setValue('Product Name Valid');
    component.form.get('description')?.setValue('Product description description description');
    component.form.get('logo')?.setValue('http://logo.png');
    component.form.get('date_release')?.setValue('2026-06-20');

    component.onSubmit();
    expect(component.isSaving).toBe(false);
    consoleSpy.mockRestore();
  });

  it('should reset form onReset()', () => {
    fixture.detectChanges();
    component.form.get('name')?.setValue('Dirty Name');
    
    component.onReset();
    expect(component.form.get('name')?.value).toBeNull();
  });

  it('should reload details onReset() in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('prod-123');
    fixture.detectChanges();
    
    component.form.get('name')?.setValue('Dirty Name');
    component.onReset();
    
    expect(mockProductService.getProduct).toHaveBeenCalledTimes(2);
  });

  it('should navigate back onBack()', () => {
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should generate template error message strings', () => {
    fixture.detectChanges();
    const idControl = component.form.get('id');
    const nameControl = component.form.get('name');
    const descControl = component.form.get('description');
    const logoControl = component.form.get('logo');
    const dateControl = component.form.get('date_release');

    // Required tests
    idControl?.setValue('');
    expect(component.getIdErrorMessage()).toContain('required');

    nameControl?.setValue('');
    expect(component.getNameErrorMessage()).toContain('required');

    descControl?.setValue('');
    expect(component.getDescriptionErrorMessage()).toContain('required');

    logoControl?.setValue('');
    expect(component.getLogoErrorMessage()).toContain('required');

    dateControl?.setValue('');
    expect(component.getReleaseDateErrorMessage()).toContain('required');

    // Length/Specific errors
    idControl?.setValue('ab');
    expect(component.getIdErrorMessage()).toContain('Minimum');

    idControl?.setValue('abcdefghijklm');
    expect(component.getIdErrorMessage()).toContain('Maximum');

    idControl?.setErrors({ idExists: true });
    expect(component.getIdErrorMessage()).toContain('registered');

    nameControl?.setValue('abc');
    expect(component.getNameErrorMessage()).toContain('Minimum');

    descControl?.setValue('abc');
    expect(component.getDescriptionErrorMessage()).toContain('Minimum');

    dateControl?.setErrors({ invalidReleaseDate: true });
    expect(component.getReleaseDateErrorMessage()).toContain('today');
  });
});
