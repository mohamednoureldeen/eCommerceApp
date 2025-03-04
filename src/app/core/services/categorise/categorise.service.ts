// src/app/core/services/categorise/categorise.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriseService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches all available categories from the server
   * @returns An Observable containing the list of categories
   */
  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  /**
   * Retrieves details of a specific category by its ID
   * @param id The ID of the category to fetch
   * @returns An Observable containing the category data
   */
  getSpecificCategories(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }

}


