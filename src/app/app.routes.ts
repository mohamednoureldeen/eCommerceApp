
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsResolver } from './core/resolvers/productresolver/details.resolver';
import { CartResolver } from './core/resolvers/cartresolver/cart.resolver';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    {
        path: '',
        component: AuthLayoutComponent, canActivate:[logedGuard],
        children: [
            {
                path: 'login',
                title: 'login',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                title: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'forgot',
                title: 'forgot',
                loadComponent: () => import('./pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent)
            }
        ]
    },
    {
        path: '',
        component: BlankLayoutComponent, canActivate:[authGuard],
        children: [
            {
                path: 'home',
                title: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'cart',
                title: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
                resolve: { cart: CartResolver}
            },
            {
                path: 'allorders/:id',
                title: 'allorders',
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent)
                
            },
            {
                path: 'products',
                title: 'products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: 'brands',
                title: 'brands',
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent)
            },
            {
                path: 'categories',
                title: 'categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            },
            {
                path: 'checkout/:id',
                title: 'checkout',
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)
            },
            {
                path: 'wishlist',
                title: 'wishlist',
                loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent)
            },
            {
                path: 'details/:id',
                title: 'details',
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
                resolve: { product: DetailsResolver}
            },
            { path: '**', component: NotfoundComponent }
        ]
    }
];

