import { CartService } from './../../core/services/cart/cart.service';
import { MytranslateService } from './../../core/services/myTranslate/mytranslate.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, computed, HostListener, inject, input, InputSignal, Renderer2,Signal} from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppTheme, DarkThemeSelectorService } from '../../core/services/darkmood/dark-theme-selector.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private flowbiteService: FlowbiteService, 
  private renderer:Renderer2,
  protected darkThemeSelectorService: DarkThemeSelectorService
) {
  this.loadCurrentTheme();
}
private readonly authService = inject(AuthService);
private readonly mytranslateService = inject(MytranslateService);
private readonly translateService = inject(TranslateService);
private readonly cartService = inject(CartService);

isLogin:InputSignal<boolean> = input<boolean>(true);
selectedTheme: AppTheme | undefined = undefined;
selectedThemeIcon: string = 'fas fa-desktop';
cartCount: Signal<number> = computed(() => this.cartService.cartNumber());
isScrolled = false;
  
ngOnInit(): void {

    this.flowbiteloaded();
    this.cartCountNumber();
  }

flowbiteloaded(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
    });
  }

  cartCountNumber(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
  }

  logout(): void {
    this.authService.logOut();
  }

  // Language
  changeLang(lang: string): void {
    this.mytranslateService.changeLangTranslate(lang);
    const dropdown = document.getElementById('dropdownNavbar');
    if (dropdown) {
      this.renderer.setStyle(dropdown, 'display', 'none');
    }
   

  }
  currentLang(lang: string ): boolean {
    return this.translateService.currentLang=== lang
  }


  // set theme Dark and Light
  setTheme(theme: string): void {
    switch (theme) {
      case 'light':
        this.darkThemeSelectorService.setLightTheme();
        this.selectedTheme = AppTheme.LIGHT;
        break;
      case 'dark':
        this.darkThemeSelectorService.setDarkTheme();
        this.selectedTheme = AppTheme.DARK;
        break;
      case 'system':
      default:
        this.darkThemeSelectorService.setSystemTheme();
        this.selectedTheme = undefined;
        break;
    }

    this.updateIcon();
  }

// Theme selector loader
  private loadCurrentTheme() {
    this.selectedTheme = this.darkThemeSelectorService.currentTheme();
    this.updateIcon();
  }

  // update icon
  private updateIcon() {
    if (this.selectedTheme === AppTheme.LIGHT) {
      this.selectedThemeIcon = 'fas fa-sun text-yellow-400 ';
    } else if (this.selectedTheme === AppTheme.DARK) {
      this.selectedThemeIcon = 'fas fa-moon text-gray-500 dark:text-sky-500 ';
    } else {
      this.selectedThemeIcon = 'fas fa-desktop text-blue-500 dark:text-sky-500  ';
    }
  }


// Scroll listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}

