import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaymentModel } from 'src/app/payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  readonly rootUrl = 'https://localhost:44347/api/StripePayment';

  getListOfPayments(): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.rootUrl + '/GetPayments';
    return this.http.get<any>(url, {headers: reqHeader})
      .pipe(map((response: any) => response),
        catchError(err => this.handleError(err))
      );
  }

  postPayment(payment: PaymentModel): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.rootUrl + '/CreateCharges';
    payment.amount = Number.parseFloat(payment.amount.toString());
    const data = JSON.stringify(payment);
    return this.http.post<any>(url, data, { headers: reqHeader })
      .pipe(map((response: any) => response),
        catchError(err => this.handleError(err))
      );
  }

  refundPayment(chargeId: string): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = this.rootUrl + '/RefundPayment';
    return this.http.post<any>(url, JSON.stringify(chargeId), {headers: reqHeader})
      .pipe(map((response: any) => response),
        catchError(err => this.handleError(err))
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error || 'Server error')
  }
}
