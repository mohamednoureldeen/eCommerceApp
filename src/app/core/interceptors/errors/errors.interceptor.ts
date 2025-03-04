// src/app/core/interceptors/errors/errors.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService);

  return next(req).pipe(catchError((err)=>{
  // Display an error notification using Toastr with the error message
    toastrService.error(err.error.message, 'Error')
  // Propagate the error to be handled by the subscriber
    return throwError(()=>err);
  }))};

