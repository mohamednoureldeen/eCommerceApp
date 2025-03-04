// src/app/core/services/orders/orders.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Initiates a checkout payment session.
   * 
   * @param id - The cart ID for which the payment is processed.
   * @param data - The shipping address information.
   * @returns An observable containing the checkout session details.
   */
  cheakOutPayment(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { "shippingAddress": data }
    );
  }

  /**
   * Places an order for cash payment.
   * 
   * @param id - The cart ID for which the order is placed.
   * @param data - The shipping address information.
   * @returns An observable containing the order details.
   */
  getOrdersCash(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/${id}`,
      { "shippingAddress": data }
    );
  }

  /**
   * Retrieves all orders made by a specific user.
   * 
   * @param id - The user ID whose orders are to be fetched.
   * @returns An observable containing the list of user orders.
   */
  getAllUserOrders(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${id}`
    );
  }
}

