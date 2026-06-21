import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ListComponent } from './list.component';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockProductService: jest.Mocked<any>;
  let mockRouter: any;

  const testProducts: Product[] = [
    {
      id: 'prod-001',
      name: 'Credit Card Standard',
      description: 'Standard credit card description',
      logo: 'logo1.png',
      date_release: '2026-06-20T00:00:00.000Z',
      date_revision: '2027-06-20T00:00:00.000Z'
    },
    {
      id: 'prod-002',
      name: 'Debit Card Plus',
      description: 'Plus debit card description',
      logo: 'logo2.png',
      date_release: '2026-05-15T00:00:00.000Z',
      date_revision: '2027-05-15T00:00:00.000Z'
    },
    {
      id: 'prod-003',
      name: 'Savings Account Premium',
      description: 'Account description info',
      logo: 'logo3.png',
      date_release: '2026-07-10T00:00:00.000Z',
      date_revision: '2027-07-10T00:00:00.000Z'
    }
  ];

  beforeEach(async () => {
    mockProductService = {
      getProducts: jest.fn().mockReturnValue(of({ data: testProducts })),
      deleteProduct: jest.fn().mockReturnValue(of({ message: 'Deleted' }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load products', () => {
    expect(component).toBeTruthy();
    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(3);
    expect(component.isLoading).toBe(false);
  });

  it('should handle service errors gracefully during loading', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockProductService.getProducts.mockReturnValue(throwError(() => new Error('API Error')));
    component.loadProducts();
    expect(component.isLoading).toBe(false);
    expect(component.products.length).toBe(0);
    consoleSpy.mockRestore();
  });

  it('should filter products correctly by term (name, description, id)', () => {
    component.searchTerm = 'Debit';
    component.applyFilter();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].id).toBe('prod-002');

    component.searchTerm = 'Premium';
    component.applyFilter();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].id).toBe('prod-003');

    component.searchTerm = 'prod-001';
    component.applyFilter();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].id).toBe('prod-001');

    component.searchTerm = 'non-existent';
    component.applyFilter();
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should trigger filter apply onSearch event', () => {
    const applyFilterSpy = jest.spyOn(component, 'applyFilter');
    const mockEvent = { target: { value: 'Debit' } } as unknown as Event;
    component.onSearch(mockEvent);
    expect(component.searchTerm).toBe('Debit');
    expect(applyFilterSpy).toHaveBeenCalled();
  });

  it('should sort products alphabetically by text fields', () => {
    // Sort by name ASC
    component.sortBy = 'name';
    component.sortDirection = 'asc';
    component.applyFilter();
    expect(component.filteredProducts[0].id).toBe('prod-001'); // Credit Card
    expect(component.filteredProducts[1].id).toBe('prod-002'); // Debit Card
    expect(component.filteredProducts[2].id).toBe('prod-003'); // Savings Account

    // Sort by name DESC
    component.sortDirection = 'desc';
    component.applyFilter();
    expect(component.filteredProducts[0].id).toBe('prod-003'); // Savings Account
  });

  it('should sort products chronologically by date fields', () => {
    // Sort by date_release ASC
    component.sortBy = 'date_release';
    component.sortDirection = 'asc';
    component.applyFilter();
    expect(component.filteredProducts[0].id).toBe('prod-002'); // May 15
    expect(component.filteredProducts[1].id).toBe('prod-001'); // June 20
    expect(component.filteredProducts[2].id).toBe('prod-003'); // July 10
  });

  it('should toggle sort direction and column key in toggleSort()', () => {
    // Initial sort is name asc
    component.sortBy = 'name';
    component.sortDirection = 'asc';

    // Click same key -> toggle direction
    component.toggleSort('name');
    expect(component.sortBy).toBe('name');
    expect(component.sortDirection).toBe('desc');

    // Click different key -> resets to asc
    component.toggleSort('id');
    expect(component.sortBy).toBe('id');
    expect(component.sortDirection).toBe('asc');
  });

  it('should calculate pagination getters correctly', () => {
    component.pageSize = 2;
    component.filteredProducts = testProducts; // 3 items

    expect(component.totalPages).toBe(2);

    // Page 1
    component.currentPage = 1;
    expect(component.startIndex).toBe(1);
    expect(component.endIndex).toBe(2);
    expect(component.pagesArray).toEqual([1, 2]);

    // Page 2
    component.currentPage = 2;
    expect(component.startIndex).toBe(3);
    expect(component.endIndex).toBe(3);
  });

  it('should navigate to page in goToPage() within boundaries', () => {
    component.pageSize = 2;
    component.filteredProducts = testProducts; // 2 pages
    component.currentPage = 1;

    component.goToPage(2);
    expect(component.currentPage).toBe(2);

    // Invalid page outside bounds
    component.goToPage(3);
    expect(component.currentPage).toBe(2);
  });

  it('should shift pages in prevPage() and nextPage()', () => {
    component.pageSize = 2;
    component.filteredProducts = testProducts;
    component.currentPage = 1;

    component.nextPage();
    expect(component.currentPage).toBe(2);

    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should reset current page to 1 when pageSize changes', () => {
    component.currentPage = 2;
    const mockEvent = { target: { value: '10' } } as unknown as Event;
    component.onPageSizeChange(mockEvent);
    expect(component.pageSize).toBe(10);
    expect(component.currentPage).toBe(1);
  });

  it('should navigate to add page onAddProduct', () => {
    component.onAddProduct();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/add']);
  });

  it('should navigate to edit page onEditProduct', () => {
    component.onEditProduct(testProducts[0]);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit', 'prod-001']);
  });

  it('should manage deletion confirmation modal state', () => {
    expect(component.isModalOpen).toBe(false);

    component.openDeleteModal(testProducts[0]);
    expect(component.productToDelete).toEqual(testProducts[0]);
    expect(component.isModalOpen).toBe(true);

    component.closeDeleteModal();
    expect(component.isModalOpen).toBe(false);
    expect(component.productToDelete).toBeNull();
  });

  it('should confirm delete and reload products on confirmDelete()', () => {
    component.productToDelete = testProducts[0];
    component.isModalOpen = true;

    component.confirmDelete();

    expect(component.isDeleting).toBe(false);
    expect(mockProductService.deleteProduct).toHaveBeenCalledWith('prod-001');
    expect(component.isModalOpen).toBe(false);
    expect(component.productToDelete).toBeNull();
  });

  it('should handle deletion failure gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockProductService.deleteProduct.mockReturnValue(throwError(() => new Error('Delete Error')));
    component.productToDelete = testProducts[0];

    component.confirmDelete();

    expect(component.isDeleting).toBe(false);
    expect(component.isModalOpen).toBe(false);
    consoleSpy.mockRestore();
  });
});
