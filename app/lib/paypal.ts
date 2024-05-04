import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new checkoutNodeJssdk.core.SandboxEnvironment("AYPtwic_UVygd3N2nQZaS9RETRpS0kv6NYLTxgoicB56Sv1rgNOxgx_aMMsy3nGP8DOSMrzOfLt8ZQ5z", "EOJ8x21l1QAaSrqJ26dx3V3oIrcIpk0cCApT8PoicWgPch86GiF8QoOrWLmNSG7-KzlzV2NIKyfyz90L");
const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

export default client;