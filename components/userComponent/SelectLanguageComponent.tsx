import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
// import Select from "react-dropdown-select";
import {Select, SelectItem} from "@nextui-org/react";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import 'react-dropdown/style.css';
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';
interface Props {
  isLanguageSelected: boolean;
  setisLanguageSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: quizzLanguage | null;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<quizzLanguage | null>>;
  quizzLanguageList: quizzLanguage[] | null;
}

const SelectLanguageComponent: React.FC<Props> = ({
  isLanguageSelected,
  setisLanguageSelected,
  selectedLanguage,
  setSelectedLanguage,
  quizzLanguageList
})  => {
    // const {isLanguageSelected, setisLanguageSelected, selectedLanguage,setSelectedLanguage,quizzLanguageList}=props;
    const [isLanguageFilterOpen, setIsLanguageFilterOpen] = useState(false);
    const languageInputRef = useRef<HTMLInputElement>(null);
    const languageButtonRef = useRef<HTMLDivElement>(null);
    const languageDropDownRef = useRef<HTMLDivElement>(null);
    const [languageHiligtedIndex, setLanguageHiligtedIndex] = useState(-1);
    const [languageList, setlanguageList] = useState<quizzLanguage[]>([]);
    const [isStateSelectedOrNot, setIsStateSelectedOrNot] = useState<boolean>(true);
   
     const handleCategorySelectedSearchElement=(language:quizzLanguage)=>{
      setSelectedLanguage(language);
      setIsLanguageFilterOpen(false);
    }
//to handle the key presses in the category Input element 
const handleKeyDownlanguage = (event: React.KeyboardEvent<HTMLInputElement>) => {
  setIsLanguageFilterOpen(true);
  if (event.key === "ArrowDown") {
    if ((languageHiligtedIndex === -1 || languageHiligtedIndex === 0) && quizzLanguageList?.length && quizzLanguageList.length > 1) {
      setLanguageHiligtedIndex(languageHiligtedIndex + 1);
      setSelectedLanguage(quizzLanguageList[languageHiligtedIndex + 1] || null);
    } else if (languageHiligtedIndex === 0 && quizzLanguageList?.length && quizzLanguageList.length === 1) {
      setLanguageHiligtedIndex(0);
      setSelectedLanguage(quizzLanguageList[0] || null);
    } else if (languageHiligtedIndex === (quizzLanguageList?.length || 0) - 1) {
      setLanguageHiligtedIndex(0);
      setSelectedLanguage(quizzLanguageList ? quizzLanguageList[0] : null);

    } else {
      setLanguageHiligtedIndex(languageHiligtedIndex + 1);
      setSelectedLanguage(quizzLanguageList? quizzLanguageList[languageHiligtedIndex + 1] : null);
    }
  } else if (event.key === "ArrowUp") {
    if ((languageHiligtedIndex === -1 || languageHiligtedIndex === 0) && quizzLanguageList?.length && quizzLanguageList.length > 1) {
      setLanguageHiligtedIndex(quizzLanguageList.length - 1);
      setSelectedLanguage(quizzLanguageList[quizzLanguageList.length - 1] || null);
    } else if ((languageHiligtedIndex === 0 || languageHiligtedIndex === -1) && quizzLanguageList?.length && quizzLanguageList.length === 1) {
      setLanguageHiligtedIndex(0);
      setSelectedLanguage(quizzLanguageList[0] || null);
    } else if ((languageHiligtedIndex === (quizzLanguageList?.length || 0) - 1) && quizzLanguageList?.length && quizzLanguageList.length > 0) {
      setLanguageHiligtedIndex(languageHiligtedIndex - 1);
      setSelectedLanguage(quizzLanguageList[languageHiligtedIndex - 1] || null);
    } else {
      setLanguageHiligtedIndex(languageHiligtedIndex - 1);
      setSelectedLanguage(quizzLanguageList ? quizzLanguageList[languageHiligtedIndex - 1] : null);
    }
  } else if (event.key === "Enter") {
    setIsLanguageFilterOpen(false);
  }
}



const handleSelectedLanguage = (e: ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  setLanguageHiligtedIndex(-1);
  if (newValue !== "") {
    // Find the quizzLanguage object with the corresponding name
    const language = quizzLanguageList?.find(language => language.quizzCategoryName.toLowerCase() === newValue.toLowerCase());
    
    // Check if the language is found
    if (language) {
      setSelectedLanguage(language);
      setIsLanguageFilterOpen(true);

      // You may want to clear the filterValue here since a new language is selected
      setlanguageList([]);
    } else {
      // Handle the case where the language is not found
      // For example, you could display an error message or reset the selected language to null
      setSelectedLanguage(null);
      setIsLanguageFilterOpen(false);
      // You can also set an error state if needed
      // setError("Language not found");
    }
  } else {
    setSelectedLanguage(null);
    setIsLanguageFilterOpen(true);
    setlanguageList([]);
  }
}

const handleNextLanguageClick=()=>{
 
  if(selectedLanguage!==null)
    {
      setisLanguageSelected(true);
    }
    else{
      setisLanguageSelected(false);
    }
}


useEffect(() => {
  if(selectedLanguage!==null)
    {
      setIsStateSelectedOrNot(true);
    }
    else{
      setIsStateSelectedOrNot(false);
    }

}, [selectedLanguage])

    return (
    <>
    <div  className='flex flex-col  justify-center items-center w-full h-full '>
      {!isStateSelectedOrNot && <div className='flex flex-row text-red-500'>Please Select a Language TO continue</div>}
      {quizzLanguageList ?
      <div className='w-52'>
    <div className='flex flex-col w-full  items-center '>
        <div className='my-1 text-xl font-bold'>Select Language</div>
     <div className='flex flex-col'>
        <div  className='my-1 mx-auto flex cursor-text bg-white  py-2 px-1 w-[90%] rounded-xl border-[1px] border-black placeholder-slate-700 focus-within:border-2   focus-within:border-slate-800   '>
        <input
        value={selectedLanguage?.quizzCategoryName}
        
       className='border-none w-[100%] focus:outline-none'
        placeholder='Select Language'
        type='text'
        onKeyDown={handleKeyDownlanguage}
        onChange={handleSelectedLanguage}
        onFocus={()=>setIsLanguageFilterOpen(true)}
        ref={languageInputRef}
         />

        <div ref={languageButtonRef}  onClick={()=>setIsLanguageFilterOpen(true)} className='flex justify-center items-center hover:text-zinc-500 cursor-pointer'><IoIosArrowDown  size={15}/></div>
       
        </div>
{isLanguageFilterOpen &&
        <div ref={languageDropDownRef} className='flex bg-white w-48 h-72 overflow-y-scroll absolute mt-12 rounded z-50 flex-col border-black border-[2px] '>
         <>
         {quizzLanguageList.map((language:quizzLanguage, index:any) => (
  <div key={language.quizzCategoryId} className="m-1 p-1 flex-col hover:bg-slate-200">
    <div onClick={() => handleCategorySelectedSearchElement(language)} className={`cursor-pointer flex border-b-2 border-b-black ${languageHiligtedIndex === index ? "bg-slate-300" : ""}`}>
      {language.quizzCategoryName}
    </div>
  </div>
))}

         </>
        </div>
        }
        </div>

      </div>
      </div>:<div>Loading.....</div> }

        <div className=' mt-2 flex flex-row w-3/4 bg-black text-white font-bold text-2xl p-2 items-center justify-center rounded-md hover:bg-slate-600 cursor-pointer' onClick={handleNextLanguageClick} >Next</div>

      </div>
      
    </>
  )
}

export default SelectLanguageComponent
