// src/app/core/services/products/products.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all available products from the API.
   * 
   * @returns An observable containing the list of all products.
   */
  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  /**
   * Retrieves details of a specific product by its ID.
   * 
   * @param id - The ID of the product to fetch.
   * @returns An observable containing the product details.
   */
  getSpecificProducts(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
