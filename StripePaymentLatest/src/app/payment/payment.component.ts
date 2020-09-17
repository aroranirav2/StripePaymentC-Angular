import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../shared/services/payment.service';
import { PaymentModel } from './payment-model';
import { UserModel } from './user-model';
declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentModel = new PaymentModel();
  userModel = new UserModel();
  readonly stripe = Stripe(''); //Primary Key of stripe account
  card: any;

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    // Create `card` element that will watch for updates
    // and display error messages
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
    this.card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }
  onSubmit(): void {
    this.stripe.createToken(this.card,
      {
        name: this.userModel.name,
        address_line1: this.userModel.addressLine1,
        address_line2: this.userModel.addressLine2,
        address_city: this.userModel.city,
        address_state: this.userModel.state,
        email: this.userModel.email
      }).then(result => {
        if (result.error) {
          console.log('Error creating payment method.');
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // At this point, you should send the token ID
          // to your server so it can attach
          // the payment source to a customer
          this.paymentModel.tokenId = result.token.id;
          this.paymentModel.email = this.userModel.email;
          //this.paymentModel.amount = 1000;
          this.paymentService.postPayment(this.paymentModel).subscribe(response => {
            if (response.success === 'true') {
              console.log("Payment received");
            } else {
              console.log("Payment Declined")
            }
          });
          console.log('Token acquired!');
          console.log(result.token);
          console.log(result.token.id);
        }
      });
  }
}
