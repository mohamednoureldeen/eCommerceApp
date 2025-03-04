// src/app/core/services/cart/cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  // Signal to store the cart item count, replacing the BehaviorSubject
  cartNumber: WritableSignal<number> = signal(0);

  // Store the user token from local storage
  myToken: any = localStorage.getItem('userToken');

  /**
   * Adds a product to the cart
   * @param id The product ID to add to the cart
   * @returns An Observable with the response data
   */
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      },
      {
        headers: {
          token: this.myToken
        }
      }
    );
  }

  /**
   * Retrieves the logged-in user's cart data
   * @returns An Observable with the cart data
   */
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers: {
          token: this.myToken
        }
      }
    );
  }

  /**
   * Removes a specific item from the cart
   * @param id The ID of the cart item to remove
   * @returns An Observable with the response data
   */
  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        headers: {
          token: this.myToken
        }
      }
    );
  }

  /**
   * Clears all items from the cart
   * @returns An Observable with the response data
   */
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }

  /**
   * Updates the quantity of a specific product in the cart
   * @param id The ID of the product to update
   * @param newCount The new quantity to set for the product
   * @returns An Observable with the response data
   */
  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
    );
  }
}

