"use client"
import React, { useEffect, useState } from 'react'

interface Props{
    
    setIsQuestionNumberSelected:React.Dispatch<React.SetStateAction<boolean>>;
    selectedQustionNumber:number ;
    setSelectedQustionNumber:React.Dispatch<React.SetStateAction<number>>
}
const SelectQNumber:React.FC<Props>=({

setIsQuestionNumberSelected,
selectedQustionNumber,
setSelectedQustionNumber
}) => {
    const [QnumberError, setQNumberError] = useState("");
    const  handleNextQNumberClick=()=> {
        if(selectedQustionNumber>=1){
            setIsQuestionNumberSelected(true);
        }
        else{
            setIsQuestionNumberSelected(false);
        }
    }

    useEffect(() => {
     if(selectedQustionNumber<1)
        {
         setQNumberError("Selected Question Number Must be Greate than or Equal to 1")       
        }
        else{
            setQNumberError("");
        }
    }, [selectedQustionNumber])
    
   const handleInputNumberChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue=parseInt(event.target.value);
    setSelectedQustionNumber(newValue);
   }
    
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      {QnumberError &&<div className='text-red-500 text-base'> {
        QnumberError
      }</div>}
      <div className='flex- flex-row '>
        <input type="Number" min={1} value={selectedQustionNumber} 
        onChange={handleInputNumberChange} />
      </div>
      <div className=' mt-2 flex flex-row w-3/4 bg-black text-white font-bold text-2xl p-2 items-center justify-center rounded-md hover:bg-slate-600 cursor-pointer' onClick={handleNextQNumberClick} >Next</div>
    </div>
  )
}

export default SelectQNumber
