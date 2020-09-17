using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentGatewayAPI.ViewModels
{
    public class PaymentViewModel
    {
        public long Amount { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Description { get; set; }
        public string ChargeId { get; set; }
        public bool IsRefunded { get; set; }
    }
}
