import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslationService } from './core/services/translation.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let translationService: TranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should track active language and allow changing it', () => {
    expect(component.activeLang).toBe(translationService.getCurrentLanguage());

    const setLangSpy = jest.spyOn(translationService, 'setLanguage');
    component.setLanguage('en');
    expect(setLangSpy).toHaveBeenCalledWith('en');
    expect(component.activeLang).toBe('en');

    component.setLanguage('es');
    expect(component.activeLang).toBe('es');
  });
});

