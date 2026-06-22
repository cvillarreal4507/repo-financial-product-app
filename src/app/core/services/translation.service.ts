import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { en } from '../i18n/en';
import { es } from '../i18n/es';

export type Lang = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<Lang>('es');
  currentLang$ = this.currentLangSubject.asObservable();

  private translations: Record<Lang, Record<string, string>> = { en, es };

  constructor() {
    const savedLang = localStorage.getItem('app_lang') as Lang;
    if (savedLang === 'en' || savedLang === 'es') {
      this.currentLangSubject.next(savedLang);
    } else {
      // Default to spanish or english based on browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'es') {
        this.currentLangSubject.next(browserLang as Lang);
      }
    }
  }

  getCurrentLanguage(): Lang {
    return this.currentLangSubject.value;
  }

  setLanguage(lang: Lang): void {
    if (lang === 'en' || lang === 'es') {
      localStorage.setItem('app_lang', lang);
      this.currentLangSubject.next(lang);
    }
  }

  instant(key: string, params?: Record<string, string | number>): string {
    const lang = this.getCurrentLanguage();
    const dictionary = this.translations[lang];
    let translation = dictionary[key] || key;

    if (params) {
      Object.keys(params).forEach((paramKey) => {
        const replacement = String(params[paramKey]);
        translation = translation.replace(new RegExp(`{${paramKey}}`, 'g'), replacement);
      });
    }

    return translation;
  }
}
