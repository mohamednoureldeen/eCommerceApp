// src/app/core/resolvers/cartresolver/cart.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { ICart } from '../../../shared/interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class CartResolver implements Resolve<ICart> {
  constructor(private cartService: CartService) {}

  // The resolve method fetches data before loading the component
  resolve(): Observable<ICart> {
    // Returns the cart data from the CartService
    return this.cartService.getLoggedUserCart(); 
  }
}
