import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Adds a product to the wishlist.
   * 
   * @param id - The ID of the product to add to the wishlist.
   * @returns An observable containing the server response.
   */
  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": id
    });
  }

  /**
   * Removes a specific product from the wishlist.
   * 
   * @param id - The ID of the product to remove from the wishlist.
   * @returns An observable containing the server response.
   */
  removeProductFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`);
  }

  /**
   * Retrieves all products in the wishlist.
   * 
   * @returns An observable containing the list of wishlist items.
   */
  getWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
