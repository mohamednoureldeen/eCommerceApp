// src/app/core/services/brands/brands.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches all brands from the server
   * @returns An Observable containing the list of all brands
   */
  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

  /**
   * Fetches a specific brand by its ID
   * @param id The ID of the brand to fetch
   * @returns An Observable containing the brand data
   */
  getSpecificBrands(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`);
  }
}
