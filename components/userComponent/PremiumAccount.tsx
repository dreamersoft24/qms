import { useEffect, useState } from "react";
import PayPalButton from "./PayPalButton";
import fetchApiDataPost from "../apiFunctionForPost";
import fetchApiData from "../apiFunction";
import TransacitonInterface from "../Interfaces/TransactionInterface";
interface Props{
  setIsPremiumAccontClicked:React.Dispatch<React.SetStateAction<boolean>>;
}
const PremiumAccount:React.FC<Props> = ({
  setIsPremiumAccontClicked
}) => {
  const [isTransectionSuccessful, setisTransectionSuccessful] = useState<boolean>(false);
 const [isAlreadyPaid, setisAlreadyPaid] = useState<boolean>(false);
 const [transactionData, setTransactionData] = useState<TransacitonInterface|null>(null);
 const [transectionDataError, setTransectionDataError] = useState(""); 
 const handleSuccess = (transactionData: any) => {
    console.log('Transaction successful:', transactionData);
    setisTransectionSuccessful(true);
  };

  const handleError = (error: any) => {
    console.error('Transaction failed:', error);
    setisTransectionSuccessful(false);
  };

  useEffect(() => {
    if(isTransectionSuccessful===true)
      {
        const userIdstr=localStorage.getItem("userID");
       if(userIdstr!==null){
       const userID=parseInt(userIdstr,10);
     const a=10.0;
        fetchApiData(`http://192.168.10.11:8080/report/transaction/addNewTransaction/${userID}/${a}`,
        "POST",  
        setTransactionData,
          setTransectionDataError
        );
        setIsPremiumAccontClicked(false);
      }
    }
     
   
  }, [isTransectionSuccessful])
  
useEffect(() => {
  const userIdstr=localStorage.getItem("userID");
  if(userIdstr!==null){
  const userID=parseInt(userIdstr,10);
  fetchApiData(`http://192.168.10.11:8080/report/transaction/getTransactionHistoryByUserID/${userID}`,"GET",
    setTransactionData,
    setTransectionDataError
  );

}

}, [])

useEffect(() => {
  if(transactionData!=null)
    {
      setisAlreadyPaid(true);
    }
    else{
      setisAlreadyPaid(false);
    }
}, [transactionData])


  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      {isAlreadyPaid?<div className="flex flex-col  justify-center items-center  ">

        <div className="text-xl font-bold ">
             Thanks! You have Already Subscribed
        </div>
        
        
          <div>

        {transactionData &&
        <div className="flex flex-col ">
          <div className="flex flex-row m-1">
            <div className="font-bold underline">Transaciton Date: </div>
            <div>{transactionData.transactionDate.toLocaleString()}</div>
          </div>
          <div className="flex flex-row m-1">
            <div className="font-bold">Transaction Ammount : </div>
            <div>{transactionData.transactionAmmount} USD</div>
          </div>
          <div className="flex flex-row m-1 p-2 justify-center items-center font-bold rounded-full bg-green-200 border">            
            {transactionData.transactionStatusName}
          </div>
        </div>
        }
          </div>
        

      </div>:
      <div className="w-1/3 justify-center items-center">
       <h1 className="mb-5 text-xl font-bold ">To subscribe click on paypal and get the premium account</h1>
        <PayPalButton
          amount={10}
          onSuccess={handleSuccess}
          onError={handleError}
          clientId="AYPtwic_UVygd3N2nQZaS9RETRpS0kv6NYLTxgoicB56Sv1rgNOxgx_aMMsy3nGP8DOSMrzOfLt8ZQ5z"
          onTransactionSuccess={setisTransectionSuccessful} // pass the callback as a prop
        />
      </div>
      }
    </div>
  );
};

export default PremiumAccount;