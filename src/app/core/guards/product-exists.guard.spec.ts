import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductExistsGuard } from './product-exists.guard';
import { ProductService } from '../../features/products/services/product.service';
import { of, throwError } from 'rxjs';

describe('ProductExistsGuard', () => {
  let guard: ProductExistsGuard;
  let mockProductService: jest.Mocked<any>;
  let mockRouter: any;

  beforeEach(() => {
    mockProductService = {
      verifyProductExists: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ProductExistsGuard,
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(ProductExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if product exists', (done) => {
    mockProductService.verifyProductExists.mockReturnValue(of(true));
    const mockRouteSnapshot = {
      paramMap: {
        get: jest.fn().mockReturnValue('prod-123')
      }
    } as any;

    guard.canActivate(mockRouteSnapshot, {} as any).subscribe((result) => {
      expect(result).toBe(true);
      expect(mockProductService.verifyProductExists).toHaveBeenCalledWith('prod-123');
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should navigate and block if product does not exist', (done) => {
    mockProductService.verifyProductExists.mockReturnValue(of(false));
    const mockRouteSnapshot = {
      paramMap: {
        get: jest.fn().mockReturnValue('prod-123')
      }
    } as any;

    guard.canActivate(mockRouteSnapshot, {} as any).subscribe((result) => {
      expect(result).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
      done();
    });
  });

  it('should navigate and block if service errors out', (done) => {
    mockProductService.verifyProductExists.mockReturnValue(throwError(() => new Error('API Error')));
    const mockRouteSnapshot = {
      paramMap: {
        get: jest.fn().mockReturnValue('prod-123')
      }
    } as any;

    guard.canActivate(mockRouteSnapshot, {} as any).subscribe((result) => {
      expect(result).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
      done();
    });
  });

  it('should navigate and block if route does not contain id', (done) => {
    const mockRouteSnapshot = {
      paramMap: {
        get: jest.fn().mockReturnValue(null)
      }
    } as any;

    guard.canActivate(mockRouteSnapshot, {} as any).subscribe((result) => {
      expect(result).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
      done();
    });
  });
});
