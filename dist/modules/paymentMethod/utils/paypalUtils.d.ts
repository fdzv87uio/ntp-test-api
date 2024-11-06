declare function getAccessToken(): Promise<string>;
interface CreditCardDetails {
    number: string;
    type: string;
    expire_month: string;
    expire_year: string;
    cvv2: string;
    first_name: string;
    last_name: string;
}
interface PaymentDetails {
    amount: string;
    currency: string;
    description: string;
}
declare function addCreditCard(accessToken: string, cardDetails: CreditCardDetails): Promise<any>;
declare function createPayment(accessToken: string, paymentDetails: PaymentDetails): Promise<any>;
declare function capturePayment(accessToken: string, orderID: string): Promise<any>;
export { getAccessToken, addCreditCard, createPayment, capturePayment, CreditCardDetails, PaymentDetails };
