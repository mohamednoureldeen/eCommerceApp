import { NgxPaginationModule, PaginatePipe, PaginationControlsComponent } from 'ngx-pagination';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpLoadFils';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(), withInterceptors([headersInterceptor, errorsInterceptor, loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(PaginationControlsComponent, PaginatePipe, NgxPaginationModule,  NgxSpinnerModule, SweetAlert2Module.forRoot(),
      TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }),withHashLocation(), withViewTransitions() ), provideClientHydration(withEventReplay())]
};
