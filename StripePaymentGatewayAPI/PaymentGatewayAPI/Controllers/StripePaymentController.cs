using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PaymentGatewayAPI.Config;
using PaymentGatewayAPI.Mappers;
using PaymentGatewayAPI.Models;
using Stripe;

namespace PaymentGatewayAPI.Controllers
{
    [EnableCors("CorsEnabledGlobally")]
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class StripePaymentController : ControllerBase
    {
        private readonly StripePaymentKeys _stripePaymentKeys;
        public StripePaymentController(IOptions<StripePaymentKeys> stripePaymentKeys)
        {
            _stripePaymentKeys = stripePaymentKeys.Value;
            StripeConfiguration.ApiKey = _stripePaymentKeys.SecretKey;
        }
        [HttpGet]
        public async Task<IActionResult> GetBalance()
        {
            var service = new BalanceService();
            Balance balance = await service.GetAsync();
            //IsExistingCustomer("aroranirav2@gmail.com");
            return new OkObjectResult(new { success = "true", bal = balance.Object });
        }
        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            var options = new ChargeListOptions
            {
                Limit = 100
            };
            var service = new ChargeService();
            StripeList<Charge> charges = await service.ListAsync(
                options
            );
            return new OkObjectResult(new { success = "true", payments = PaymentMapper.Map(charges.Data) });
        }
        [HttpPost]
        public async Task<IActionResult> CreateCharges([FromBody] CreateChargeModel model)
        {
            //create new customer only if the email address is different compared to existing one
            //write the logic for that
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customers = new CustomerService();
            var customer = customers.Create(new CustomerCreateOptions
            {
                Email = model.Email,
                Source = model.TokenId,
            });
            var options = new ChargeCreateOptions
            {
                Amount = (int)(model.Amount * 100),
                Currency = "usd",
                Description = "Test Charge",
                Customer = customer.Id,
                ReceiptEmail = model.Email
            };
            var service = new ChargeService();
            await service.CreateAsync(options);
            return new OkObjectResult(new { Success = "true", message = "Payment Received." });
        }
        [HttpPost]
        public async Task<ActionResult> RefundPayment([FromBody] string chargeId) //Full Refund, we can set up amount in refund options for partial refund
        {
            var refunds = new RefundService();
            var refundOptions = new RefundCreateOptions
            {
                Charge = chargeId
                //Amount = 1000
            };
            var refund = await refunds.CreateAsync(refundOptions);
            return new OkObjectResult(new { Success = "true" });
        }

        private static bool IsExistingCustomer(string email)
        {
            var options = new CustomerListOptions
            {
                Email = "aroranirav2@gmail.com",
                Limit = 1
            };
            var service = new CustomerService();
            StripeList<Customer> customers = service.List(
                options
                );
            StripeEntity<Customer> customer = service.Get(email);
            return false;
        }
    }
}
