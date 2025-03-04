import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  /**
   * Dynamically loads the Flowbite library on the browser platform.
   * @param callback A function to execute once Flowbite is loaded.
   */
  loadFlowbite(callback: (flowbite: any) => void) {
    // Check if the code is running in the browser (not server-side)
    if (isPlatformBrowser(this.platformId)) {
      // Dynamically import the Flowbite library
      import('flowbite').then(flowbite => {
        // Execute the provided callback function with the Flowbite instance
        callback(flowbite);
      });
    }
  }
}
