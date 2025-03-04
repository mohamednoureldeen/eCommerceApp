// src/app/core/services/darkmood/dark-theme-selector.service.ts
import { Injectable, signal } from '@angular/core';

// Enum which contains only LIGHT and DARK themes, if DEVICE theme selected it means you don't need a value for this purpose. DEVICE theme means no user preferences in the app. That is why value should be undefined (removed from localStorage).
export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}
// for SSR and SSG support.
const CLIENT_RENDER = typeof localStorage !== 'undefined';
// name of variable in localStorage.
const LS_THEME = 'theme';
// previously selected value by user, if available.
let selectedTheme: AppTheme|undefined = undefined;
// if render happens on client side
if (CLIENT_RENDER) {
  // then set value from localStorage or if it not available leave it undefined.
  selectedTheme = localStorage.getItem(LS_THEME) as AppTheme || undefined;
}
@Injectable({
  providedIn: 'root',
})
export class DarkThemeSelectorService {
  // Reactive signal to store the current theme
  currentTheme = signal<AppTheme | undefined>(selectedTheme);

  /**
   * Set the theme to Light mode
   */
  setLightTheme() {
    this.currentTheme.set(AppTheme.LIGHT);
    this.setToLocalStorage(AppTheme.LIGHT);
    this.removeClassFromHtml('dark');
  }

  /**
   * Set the theme to Dark mode
   */
  setDarkTheme() {
    this.currentTheme.set(AppTheme.DARK);
    this.setToLocalStorage(AppTheme.DARK);
    this.addClassToHtml('dark');
  }

  /**
   * Set the theme to follow the system's color scheme
   */
  setSystemTheme() {
    this.currentTheme.set(undefined);
    this.removeFromLocalStorage();

    // Apply the dark class if the system is in dark mode
    if (isSystemDark()) {
      this.addClassToHtml('dark');
    } else {
      this.removeClassFromHtml('dark');
    }
  }

  /**
   * Add a CSS class to the <html> element
   * @param className The class name to add
   */
  private addClassToHtml(className: string) {
    if (CLIENT_RENDER) {
      this.removeClassFromHtml(className);
      document.documentElement.classList.add(className);
    }
  }

  /**
   * Remove a CSS class from the <html> element
   * @param className The class name to remove
   */
  private removeClassFromHtml(className: string) {
    if (CLIENT_RENDER) {
      document.documentElement.classList.remove(className);
    }
  }

  /**
   * Save the selected theme to localStorage
   * @param theme The theme to store
   */
  private setToLocalStorage(theme: AppTheme) {
    if (CLIENT_RENDER) {
      localStorage.setItem(LS_THEME, theme);
    }
  }

  /**
   * Remove the theme preference from localStorage
   */
  private removeFromLocalStorage() {
    if (CLIENT_RENDER) {
      localStorage.removeItem(LS_THEME);
    }
  }
}

/**
 * Checks if the system prefers dark mode
 * @returns True if the system is in dark mode, otherwise false
 */
function isSystemDark() {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } else {
    return false;
  }
}