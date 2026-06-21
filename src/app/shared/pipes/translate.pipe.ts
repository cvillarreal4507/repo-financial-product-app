import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: Record<string, string | number>): string {
    return this.translationService.instant(key, params);
  }
}
