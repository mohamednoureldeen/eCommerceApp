// src/app/core/utils/httpLoadFils.ts
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Factory function to create an instance of TranslateHttpLoader.
 * 
 * The TranslateHttpLoader is used to load translation files for ngx-translate.
 * It constructs the translation file paths using a prefix and a suffix.
 * 
 * @param http - The HttpClient instance used to make HTTP requests.
 * @returns An instance of TranslateHttpLoader with configured path to translation files.
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/i18n/', '.json');
}
