// src/app/core/resolvers/product.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import { Iproduct } from '../../../shared/interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolver implements Resolve<Iproduct> {
  constructor(private productService: ProductsService) {}

  // The resolve method fetches product data before loading the component
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Iproduct> {
    // Get the product ID from the route parameters
    const id = route.paramMap.get('id');
    
    // Return the specific product data from the service
    return this.productService.getSpecificProducts(id!);
  }
}
