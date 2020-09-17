namespace PaymentGatewayAPI.Models
{
    public class CreateChargeModel
    {
        public string TokenId { get; set; }
        public string Email { get; set; }
        public float Amount { get; set; }
    }
}
