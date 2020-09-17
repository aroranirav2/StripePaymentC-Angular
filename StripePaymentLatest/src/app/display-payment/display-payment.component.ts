import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../shared/services/payment.service';

@Component({
  selector: 'app-display-payment',
  templateUrl: './display-payment.component.html',
  styleUrls: ['./display-payment.component.css']
})
export class DisplayPaymentComponent implements OnInit {
  paymentsData: any;
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getListOfPayments()
      .subscribe((response) => {
        this.paymentsData = response.payments;
      });
  }

  refund(i): void {
    let refundChargeId = this.paymentsData[i].chargeId;
    this.paymentService.refundPayment(refundChargeId)
      .subscribe((response) => {
        console.log(response)
      });
  }

}
