using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PaymentGatewayAPI.Config
{
    public class StripePaymentKeys
    {
        public string SecretKey { get; set; }
        public string PrimaryKey { get; set; }
    }
}
