// src/app/core/interceptors/headers/headers.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
/**
 * This interceptor adds the 'token' header to requests related to 'cart', 'orders', or 'wishlist'
 * if a user token is found in localStorage.
 */
export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('userToken')){
    // Check if the user is logged in and if the request URL matches specific endpoints
    if(req.url.includes('cart')|| req.url.includes('orders')|| req.url.includes('wishlist')){
      // Clone the request and add the token to the headers
      req = req.clone({
        setHeaders:{
          token: localStorage.getItem('userToken')!,
        }
      })
    }
  }
  // Pass the request to the next handler in the chain
  return next(req);
};
