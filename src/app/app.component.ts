import { Component, OnInit } from '@angular/core';
import { TranslationService, Lang } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'repo-financial-product-app';
  activeLang: Lang = 'es';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.activeLang = this.translationService.getCurrentLanguage();
    this.translationService.currentLang$.subscribe((lang) => {
      this.activeLang = lang;
    });
  }

  setLanguage(lang: Lang): void {
    this.translationService.setLanguage(lang);
  }
}
