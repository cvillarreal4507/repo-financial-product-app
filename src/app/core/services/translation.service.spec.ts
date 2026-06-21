import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  let langSpy: jest.SpyInstance;

  beforeEach(() => {
    localStorage.clear();
    langSpy = jest.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    langSpy.mockRestore();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to Spanish', () => {
    expect(service.getCurrentLanguage()).toBe('es');
  });

  it('should change language and update local storage', () => {
    service.setLanguage('en');
    expect(service.getCurrentLanguage()).toBe('en');
    expect(localStorage.getItem('app_lang')).toBe('en');

    service.setLanguage('es');
    expect(service.getCurrentLanguage()).toBe('es');
    expect(localStorage.getItem('app_lang')).toBe('es');
  });

  it('should resolve key translation', () => {
    service.setLanguage('en');
    expect(service.instant('BRAND_NAME')).toBe('Banco Pichincha');
    expect(service.instant('BTN_ADD_PRODUCT')).toBe('Add Product');

    service.setLanguage('es');
    expect(service.instant('BRAND_NAME')).toBe('Banco Pichincha');
    expect(service.instant('BTN_ADD_PRODUCT')).toBe('Agregar Producto');
  });

  it('should perform parameter interpolation', () => {
    service.setLanguage('en');
    const resultEn = service.instant('FOOTER_SHOWING_RECORDS', { start: 1, end: 5, total: 20 });
    expect(resultEn).toContain('Showing <strong>1</strong> to <strong>5</strong> of <strong>20</strong> products');

    service.setLanguage('es');
    const resultEs = service.instant('FOOTER_SHOWING_RECORDS', { start: 1, end: 5, total: 20 });
    expect(resultEs).toContain('Mostrando <strong>1</strong> a <strong>5</strong> de <strong>20</strong> productos');
  });

  it('should return the key if not found in dictionary', () => {
    expect(service.instant('NON_EXISTENT_KEY')).toBe('NON_EXISTENT_KEY');
  });
});
