import { TranslatePipe } from './translate.pipe';
import { TranslationService } from 'src/app/core/services/translation.service';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let mockTranslationService: jest.Mocked<any>;

  beforeEach(() => {
    mockTranslationService = {
      instant: jest.fn().mockImplementation((key: string, params?: any) => {
        if (key === 'TEST_KEY') return 'Translated Text';
        return key;
      })
    };
    pipe = new TranslatePipe(mockTranslationService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call instant on TranslationService', () => {
    const result = pipe.transform('TEST_KEY');
    expect(mockTranslationService.instant).toHaveBeenCalledWith('TEST_KEY', undefined);
    expect(result).toBe('Translated Text');
  });

  it('should pass parameters to instant', () => {
    const params = { param: 'val' };
    pipe.transform('TEST_KEY', params);
    expect(mockTranslationService.instant).toHaveBeenCalledWith('TEST_KEY', params);
  });
});
