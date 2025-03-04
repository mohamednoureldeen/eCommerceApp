// src/app/core/guards/loged.guard.ts
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const logedGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const id = inject(PLATFORM_ID);

    // to check if the user is logged in
    if (isPlatformBrowser(id)) {
      if(localStorage.getItem('userToken')){
        // User is already logged in, redirect to the home page
        router.navigate(['/home'])
        return false;
      } else{
        // User is not logged in, allow access to login or registration pages
        return true;
      }
      
    }
    else{
       // In case the platform is not a browser, deny access
      return false
    }

};
