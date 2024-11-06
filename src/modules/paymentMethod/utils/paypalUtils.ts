// src/paypal.ts
import axios from 'axios';


// Use 'https://api-m.paypal.com' for live

async function getAccessToken(): Promise<string> {
    try {
        const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
        const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
        const PAYPAL_API = process.env.PAYPAL_API;
        console.log('url');
        console.log(PAYPAL_API);
        const response = await axios({
            url: `${PAYPAL_API}/v1/oauth2/token`,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_CLIENT_SECRET,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
        return response.data;

    } catch (error: any) {
        throw new Error(error.message)
    }
}

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

async function addCreditCard(accessToken: string, cardDetails: CreditCardDetails): Promise<any> {
    const PAYPAL_API = process.env.PAYPAL_API;
    const response = await axios({
        url: `${PAYPAL_API}/v1/vault/credit-cards`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: cardDetails,
    });
    return response.data;
}

async function createPayment(accessToken: string, paymentDetails: PaymentDetails): Promise<any> {
    const PAYPAL_API = process.env.PAYPAL_API;
    console.log('url');
    console.log(PAYPAL_API);
    const response = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: paymentDetails.currency,
                        value: paymentDetails.amount,
                    },
                    description: paymentDetails.description,
                },
            ],
        },
    });
    return response.data;
}

async function capturePayment(accessToken: string, orderID: string): Promise<any> {
    const PAYPAL_API = process.env.PAYPAL_API;
    console.log('url');
    console.log(PAYPAL_API);
    const response = await axios({
        url: `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export { getAccessToken, addCreditCard, createPayment, capturePayment, CreditCardDetails, PaymentDetails };
