// src/app/core/guards/auth.guard.ts
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const id = inject(PLATFORM_ID);

 // Check if the code is running in a browser environment
  if (isPlatformBrowser(id)) {
    if(localStorage.getItem('userToken')){
    // User is logged in, allow access to the route
      return true;
    }else{
    // User is not logged in, redirect to the login page
      router.navigate(['/login'])
      return false;
    }
    
  }
// Deny access if not in a browser environment
  else{
    return false;
  }
  

};
