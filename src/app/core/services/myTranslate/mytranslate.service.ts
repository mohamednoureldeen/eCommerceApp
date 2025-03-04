// src/app/core/services/myTranslate/mytranslate.service.ts
import { TranslateService } from '@ngx-translate/core';
import { Inject, inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  // Using Renderer2 for safe DOM manipulation
  private readonly renderer2 = inject(RendererFactory2).createRenderer(null, null);

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private id: Object
  ) {

    // Check if the code is running in the browser
    if (isPlatformBrowser(this.id)) {
      // Set default language to English
      this.translateService.setDefaultLang('en');

      // Retrieve saved language from localStorage if available
      const savedLang = localStorage.getItem('lang');

      // Use saved language if it exists
      if (savedLang) {
        this.translateService.use(savedLang);
      } 

      // Apply the correct page direction based on the current language
      this.changeDirection();
    }
  }

  /**
   * Updates the document direction (LTR/RTL) and language attribute 
   * based on the saved language preference.
   */
  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      // Set page direction to Left-to-Right for English
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      // Set page direction to Right-to-Left for Arabic
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  /**
   * Changes the application's language and updates page direction accordingly.
   * 
   * @param lang The new language code (e.g., 'en' for English, 'ar' for Arabic).
   */
  changeLangTranslate(lang: string): void {
    // Save the selected language to localStorage
    localStorage.setItem('lang', lang);

    // Apply the selected language for translations
    this.translateService.use(lang);

    // Update the page direction
    this.changeDirection();
  }
}
