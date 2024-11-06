"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = getAccessToken;
exports.addCreditCard = addCreditCard;
exports.createPayment = createPayment;
exports.capturePayment = capturePayment;
const axios_1 = require("axios");
async function getAccessToken() {
    try {
        const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
        const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
        const PAYPAL_API = process.env.PAYPAL_API;
        console.log('url');
        console.log(PAYPAL_API);
        const response = await (0, axios_1.default)({
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
    }
    catch (error) {
        throw new Error(error.message);
    }
}
async function addCreditCard(accessToken, cardDetails) {
    const PAYPAL_API = process.env.PAYPAL_API;
    const response = await (0, axios_1.default)({
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
async function createPayment(accessToken, paymentDetails) {
    const PAYPAL_API = process.env.PAYPAL_API;
    console.log('url');
    console.log(PAYPAL_API);
    const response = await (0, axios_1.default)({
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
async function capturePayment(accessToken, orderID) {
    const PAYPAL_API = process.env.PAYPAL_API;
    console.log('url');
    console.log(PAYPAL_API);
    const response = await (0, axios_1.default)({
        url: `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}
//# sourceMappingURL=paypalUtils.js.map