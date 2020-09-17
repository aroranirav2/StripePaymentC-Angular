using PaymentGatewayAPI.ViewModels;
using Stripe;
using System.Collections.Generic;

namespace PaymentGatewayAPI.Mappers
{
    public class PaymentMapper
    {
        public static List<PaymentViewModel> Map(IEnumerable<Charge> payments)
        {
            var paymentViewModels = new List<PaymentViewModel>();
            foreach(var payment in payments)
            {
                var paymentViewModel = new PaymentViewModel
                {
                    Name = payment.BillingDetails.Name,
                    Amount = payment.Amount,
                    EmailAddress = payment.BillingDetails.Email,
                    Description = payment.Description,
                    ChargeId = payment.Id,
                    IsRefunded = payment.Refunded
                };
                paymentViewModels.Add(paymentViewModel);
            }
            return paymentViewModels;
        }
    }
}
