import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/core/models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const mockApiUrl = `${environment.apiUrl}/products`;

  const mockProducts: Product[] = [
    {
      id: 'p1',
      name: 'Product One',
      description: 'First Product Description',
      logo: 'logo1.png',
      date_release: '2026-06-20T00:00:00.000Z',
      date_revision: '2027-06-20T00:00:00.000Z'
    },
    {
      id: 'p2',
      name: 'Product Two',
      description: 'Second Product Description',
      logo: 'logo2.png',
      date_release: '2026-07-20T00:00:00.000Z',
      date_revision: '2027-07-20T00:00:00.000Z'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductService ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products (getProducts)', () => {
    service.getProducts().subscribe((res) => {
      expect(res.data.length).toBe(2);
      expect(res.data).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockProducts });
  });

  it('should fetch a single product by ID (getProduct)', () => {
    service.getProduct('p1').subscribe((product) => {
      expect(product).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/p1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts[0]);
  });

  it('should verify if product exists (verifyProductExists)', () => {
    service.verifyProductExists('p1').subscribe((exists) => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/verification/p1`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should create a new product (createProduct)', () => {
    const newProduct: Product = {
      id: 'p3',
      name: 'Product Three',
      description: 'Third Product Description',
      logo: 'logo3.png',
      date_release: '2026-08-20T00:00:00.000Z',
      date_revision: '2027-08-20T00:00:00.000Z'
    };

    service.createProduct(newProduct).subscribe((res) => {
      expect(res.message).toBe('Product added successfully');
      expect(res.data).toEqual(newProduct);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush({ message: 'Product added successfully', data: newProduct });
  });

  it('should update an existing product (updateProduct)', () => {
    const updatedProduct: Product = {
      ...mockProducts[0],
      name: 'Updated Product One'
    };

    service.updateProduct('p1', updatedProduct).subscribe((res) => {
      expect(res.message).toBe('Product updated successfully');
      expect(res.data).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/p1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush({ message: 'Product updated successfully', data: updatedProduct });
  });

  it('should delete a product (deleteProduct)', () => {
    service.deleteProduct('p1').subscribe((res) => {
      expect(res.message).toBe('Product removed successfully');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/p1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Product removed successfully' });
  });
});
