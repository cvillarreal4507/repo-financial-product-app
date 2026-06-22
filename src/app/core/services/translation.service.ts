import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const en = {
  // Brand / Header
  'BRAND_NAME': 'Banco Pichincha',
  'SELECT_LANGUAGE': 'Select Language',
  'ENGLISH': 'English',
  'SPANISH': 'Spanish',

  // List Page
  'PAGE_TITLE_PRODUCTS': 'Financial Products',
  'BTN_ADD_PRODUCT': 'Add Product',
  'SEARCH_PLACEHOLDER': 'Search products...',
  'LABEL_SHOW': 'Show',
  
  // Table Headers
  'TH_LOGO': 'Logo',
  'TH_ID': 'ID',
  'TH_NAME': 'Product Name',
  'TH_DESCRIPTION': 'Description',
  'TH_RELEASE_DATE': 'Release Date',
  'TH_REVISION_DATE': 'Revision Date',
  'TH_ACTIONS': 'Actions',
  
  // Empty State
  'EMPTY_TITLE': 'No products found',
  'EMPTY_SUBTITLE': 'You can register a new financial product by clicking the button below.',
  'EMPTY_BTN_REGISTER': 'Register Product',

  // Table Footer
  'FOOTER_SHOWING_RECORDS': 'Showing <strong>{start}</strong> to <strong>{end}</strong> of <strong>{total}</strong> products',
  'PAGINATION_PREV': '< Prev',
  'PAGINATION_NEXT': 'Next >',

  // Context Menu
  'ACTION_EDIT': 'Edit',
  'ACTION_DELETE': 'Delete',

  // Deletion Modal
  'MODAL_DELETE_TITLE': 'Delete Product',
  'MODAL_DELETE_CONFIRM': 'Are you sure you want to delete the product <strong>{name}</strong>? This action cannot be undone.',
  
  // Form Page
  'BTN_BACK_TO_LIST': 'Back to List',
  'FORM_TITLE_REGISTER': 'Product Registration',
  'FORM_TITLE_EDIT': 'Edit Product',
  'FORM_SUBTITLE_REGISTER': 'Complete the form to register a new financial product.',
  'FORM_SUBTITLE_EDIT': 'Update the details of the selected product.',
  
  // Form Labels
  'LABEL_ID': 'ID',
  'LABEL_NAME': 'Name',
  'LABEL_DESCRIPTION': 'Description',
  'LABEL_LOGO': 'Logo (URL)',
  'LABEL_RELEASE_DATE': 'Release Date',
  'LABEL_REVISION_DATE': 'Revision Date',

  // Form Placeholders
  'PLACEHOLDER_ID': 'E.g. trj-card',
  'PLACEHOLDER_NAME': 'E.g. Premium Credit Card',
  'PLACEHOLDER_DESCRIPTION': 'Product description...',
  'PLACEHOLDER_LOGO': 'E.g. https://example.com/logo.png',

  // Form Buttons
  'BTN_RESET': 'Reset',
  'BTN_SUBMIT': 'Submit',
  'BTN_SAVE_CHANGES': 'Save Changes',
  'BTN_CANCEL': 'Cancel',
  'BTN_CONFIRM': 'Confirm',

  // Validation Messages
  'VAL_REQUIRED': 'This field is required.',
  'VAL_MINLENGTH_ID': 'Minimum 3 characters.',
  'VAL_MAXLENGTH_ID': 'Maximum 10 characters.',
  'VAL_ID_EXISTS': 'This ID is already registered.',
  'VAL_MINLENGTH_NAME': 'Minimum 6 characters.',
  'VAL_MAXLENGTH_NAME': 'Maximum 100 characters.',
  'VAL_MINLENGTH_DESC': 'Minimum 10 characters.',
  'VAL_MAXLENGTH_DESC': 'Maximum 200 characters.',
  'VAL_INVALID_RELEASE_DATE': 'The date must be today or later.',
  'CONFIRM_LEAVE_UNSAVED': 'You have unsaved changes. Are you sure you want to leave?'
};

export const es = {
  // Brand / Header
  'BRAND_NAME': 'Banco Pichincha',
  'SELECT_LANGUAGE': 'Seleccionar Idioma',
  'ENGLISH': 'Inglés',
  'SPANISH': 'Español',

  // List Page
  'PAGE_TITLE_PRODUCTS': 'Productos Financieros',
  'BTN_ADD_PRODUCT': 'Agregar Producto',
  'SEARCH_PLACEHOLDER': 'Buscar productos...',
  'LABEL_SHOW': 'Mostrar',
  
  // Table Headers
  'TH_LOGO': 'Logo',
  'TH_ID': 'ID',
  'TH_NAME': 'Nombre del Producto',
  'TH_DESCRIPTION': 'Descripción',
  'TH_RELEASE_DATE': 'Fecha de Lanzamiento',
  'TH_REVISION_DATE': 'Fecha de Revisión',
  'TH_ACTIONS': 'Acciones',
  
  // Empty State
  'EMPTY_TITLE': 'No se encontraron productos',
  'EMPTY_SUBTITLE': 'Puedes registrar un nuevo producto financiero presionando el botón de abajo.',
  'EMPTY_BTN_REGISTER': 'Registrar Producto',

  // Table Footer
  'FOOTER_SHOWING_RECORDS': 'Mostrando <strong>{start}</strong> a <strong>{end}</strong> de <strong>{total}</strong> productos',
  'PAGINATION_PREV': '< Ant',
  'PAGINATION_NEXT': 'Sig >',

  // Context Menu
  'ACTION_EDIT': 'Editar',
  'ACTION_DELETE': 'Eliminar',

  // Deletion Modal
  'MODAL_DELETE_TITLE': 'Eliminar Producto',
  'MODAL_DELETE_CONFIRM': '¿Estás seguro de que deseas eliminar el producto <strong>{name}</strong>? Esta acción no se puede deshacer.',
  
  // Form Page
  'BTN_BACK_TO_LIST': 'Volver al Listado',
  'FORM_TITLE_REGISTER': 'Registro de Producto',
  'FORM_TITLE_EDIT': 'Editar Producto',
  'FORM_SUBTITLE_REGISTER': 'Complete el formulario para registrar un nuevo producto financiero.',
  'FORM_SUBTITLE_EDIT': 'Actualice los detalles del producto seleccionado.',
  
  // Form Labels
  'LABEL_ID': 'ID',
  'LABEL_NAME': 'Nombre',
  'LABEL_DESCRIPTION': 'Descripción',
  'LABEL_LOGO': 'Logo (URL)',
  'LABEL_RELEASE_DATE': 'Fecha de Lanzamiento',
  'LABEL_REVISION_DATE': 'Fecha de Revisión',

  // Form Placeholders
  'PLACEHOLDER_ID': 'Ej. trj-card',
  'PLACEHOLDER_NAME': 'Ej. Tarjeta de Crédito Premium',
  'PLACEHOLDER_DESCRIPTION': 'Descripción del producto...',
  'PLACEHOLDER_LOGO': 'Ej. https://ejemplo.com/logo.png',

  // Form Buttons
  'BTN_RESET': 'Reiniciar',
  'BTN_SUBMIT': 'Enviar',
  'BTN_SAVE_CHANGES': 'Guardar Cambios',
  'BTN_CANCEL': 'Cancelar',
  'BTN_CONFIRM': 'Confirmar',

  // Validation Messages
  'VAL_REQUIRED': 'Este campo es requerido.',
  'VAL_MINLENGTH_ID': 'Mínimo 3 caracteres.',
  'VAL_MAXLENGTH_ID': 'Máximo 10 caracteres.',
  'VAL_ID_EXISTS': 'Este ID ya está registrado.',
  'VAL_MINLENGTH_NAME': 'Mínimo 6 caracteres.',
  'VAL_MAXLENGTH_NAME': 'Máximo 100 caracteres.',
  'VAL_MINLENGTH_DESC': 'Mínimo 10 caracteres.',
  'VAL_MAXLENGTH_DESC': 'Máximo 200 caracteres.',
  'VAL_INVALID_RELEASE_DATE': 'La fecha debe ser hoy o posterior.',
  'CONFIRM_LEAVE_UNSAVED': 'Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?'
};

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
