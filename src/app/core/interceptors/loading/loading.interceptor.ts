// src/app/core/interceptors/loading/loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs';

/**
 * The loadingInterceptor displays a loading spinner for all requests
 * except those targeting '/wishlist' or '/cart' endpoints.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

const ngxSpinnerService = inject(NgxSpinnerService );
 // Bypass the spinner for specific endpoints
if (req.url.includes('/wishlist') || req.url.includes('/cart')) {
  return next(req);
}


  // Show the loading spinner

  ngxSpinnerService.show();

  return next(req).pipe
  (
  // Hide the spinner once the request is finalized
    finalize(() => ngxSpinnerService.hide())
  );

};
