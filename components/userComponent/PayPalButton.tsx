import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
interface Props {
    amount: number;
    onSuccess: (transactionData: any) => void;
    onError: (error: any) => void;
    onTransactionSuccess: (success: boolean) => void; // add the callback prop
    clientId:String
  }
  
  const PayPalButton = ({ amount, onSuccess, onError, onTransactionSuccess, clientId }: Props) => {
    const createOrder = (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount.toString(),
            },
          },
        ],
      });
    };
  
    const onApprove = (data: any, actions: any) => {
      return actions.order.capture().then((details: any) => {
        onSuccess(details);
        onTransactionSuccess(true); // call the callback with the success argument
      });
    };
  
    return (
      <PayPalScriptProvider options={{ clientId: 'AYPtwic_UVygd3N2nQZaS9RETRpS0kv6NYLTxgoicB56Sv1rgNOxgx_aMMsy3nGP8DOSMrzOfLt8ZQ5z' }}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
    );
  };
  
  export default PayPalButton;