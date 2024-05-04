import React, { useEffect, useState } from 'react'
import { Quizz } from '../Interfaces/QuizzInterface';
import fetchApiData from '../apiFunction';
import { MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { MdDeleteForever } from "react-icons/md";
import { QuestionInterface } from '../Interfaces/Question';
import { QuestionAndMultipleOptions } from '../Interfaces/QuestionAndMultipleOptionInterface';
import { multipleOptionInterface } from '../Interfaces/MultipleOptionInterface';
import { divider, input } from '@nextui-org/react';
import {  AddNewMultilpleOptionDTO } from '../Interfaces/AddNewMultipleOption';
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';
import fetchApiDataPost from '../apiFunctionForPost';
interface Props{
    setIsEditComponentCalled:React.Dispatch<React.SetStateAction<boolean>>;
    selectedQuizzForEditComponent:Quizz[]|null;
    setSelectedQuizzForEditComponent:React.Dispatch<React.SetStateAction<Quizz[]|null>>;

}
const EditQuizz :React.FC<Props> = ({
    setIsEditComponentCalled,
    selectedQuizzForEditComponent,
    setSelectedQuizzForEditComponent
}) => {
  const router=useRouter();
 const [questionList, setQuestionList] = useState<QuestionAndMultipleOptions[]|null>(null);
 const [questionListEror, setQuestionListEror] = useState("");
 const [createNewQuizzClicked, setCreateNewQuizzClicked] = useState<boolean>(false);
 const [questionText, setQuestionText] = useState("");
 const [multipleOptionText, setMultipleOptionText] = useState("");
 const [selectedOptionText, setSelectedOptionText] = useState("");
 const [multipleOptionTextList, setmultipleOptionTextList] = useState<AddNewMultilpleOptionDTO[]|null>(null);
 const [handleSaveQuestionError, setHandleSaveQuestionError] = useState("");
 const [isAllRequirementsCompleted, setIsAllRequirementsCompleted] = useState<boolean>(true);
 const [questionMarks, setQuestionMarks] = useState<number>(1);
 const [question, setQuestion] = useState<QuestionInterface|null>(null);
 const [questonError, setQuestonError] = useState("");
 useEffect(() => {
  // console.log("before fetching data : "+selectedQuizzForEditComponent?.[0]?.quizzId)
  fetchApiData(`http://192.168.10.11:8080/quizz/getQuizzDetailByQuizzID/${selectedQuizzForEditComponent?.[0]?.quizzId}`,"GET",setQuestionList,setQuestionListEror);

}, [])

useEffect(() => {
  if(questionList!==null)
    {
      questionList.forEach(element => {
        element.multipleOptionList.forEach(e=>{
            console.log("is correct"+e.isMultipleOptionIsCorrect);
        });
      });
    }
}, [questionList])



function handleBackClick(){
  setSelectedQuizzForEditComponent(null);
  setQuestionList(null);
  setIsAllRequirementsCompleted(true);
    setmultipleOptionTextList(null);
    setMultipleOptionText("");
    setQuestionText("");
    setQuestionMarks(1);
    setHandleSaveQuestionError("");
    setCreateNewQuizzClicked(false);
  setIsEditComponentCalled(false);
}
function handleCreateNewQuestionClicked(){
  setCreateNewQuizzClicked(true);
}

function handleCanelCreateNewQuestionButton(){
  setmultipleOptionTextList(null);
  setMultipleOptionText("");
  setQuestionMarks(1);
  setQuestionText("");
  setHandleSaveQuestionError("");
  // router.refresh;
  setCreateNewQuizzClicked(false);
}

const handleSaveMultipleOptionClick = () => {
  if (multipleOptionText !== "" && multipleOptionText !== null) {
    // Create a new object with multiple option text and isDeleted set to false
    const newOption: AddNewMultilpleOptionDTO = {
      multipleOptionText: multipleOptionText,
      isMultipleOptionIsCorrect: false // You can set a default value here or derive it from user input
    };

    // Update the multipleOptionTextList with the new option
    if (multipleOptionTextList !== null) {
      setmultipleOptionTextList([...multipleOptionTextList, newOption]);
    } else {
      setmultipleOptionTextList([newOption]);
    }

    // Reset the multipleOptionText state to clear the input field
    setMultipleOptionText("");
  }
};
function handleDeleteMultipleOptionClick(multipleOption: AddNewMultilpleOptionDTO) {
  // Check if multipleOptionTextList is not null
  if (multipleOptionTextList !== null) {
    // Filter out the element to be deleted based on a condition
    const updatedList = multipleOptionTextList.filter(option => option !== multipleOption);

    // Update the state with the updated list
    setmultipleOptionTextList(updatedList);
  }
}

function handleSaveQuestionClick() {
  if (questionText === "" || questionText === null) {
    setHandleSaveQuestionError("Please enter question text to save.");
    setIsAllRequirementsCompleted(false);
    return;
  } else if (multipleOptionTextList === null || multipleOptionTextList.length < 1) {
    setHandleSaveQuestionError("Please add multiple options against the question to save.");
    setIsAllRequirementsCompleted(false);
    return;
  } else if (selectedOptionText === "" || selectedOptionText === null) {
    setHandleSaveQuestionError("Please select one of the multiple options to save.");
    setIsAllRequirementsCompleted(false);
    return;
  } else if (questionMarks < 1 || questionMarks === null) {
    setHandleSaveQuestionError("Please enter a valid question marks to continue to save.");
    setIsAllRequirementsCompleted(false);
    return;
  }

  // Update isMultipleOptionCorrect property based on selected option
  const updatedOptions = multipleOptionTextList.map(option => ({
    ...option,
    isMultipleOptionCorrect: option.multipleOptionText === selectedOptionText
  }));

  // Send updatedOptions array as part of the request body
  fetchApiDataPost(
    `http://192.168.10.11:8080/quizz/addNewQuestion/${selectedQuizzForEditComponent?.[0]?.quizzId}/${questionText}/${questionMarks}`,
    "POST",
    updatedOptions,
    setQuestion,
    setQuestonError
  )
  .then(() => {
    setIsAllRequirementsCompleted(true);
    setmultipleOptionTextList(null);
    setMultipleOptionText("");
    setQuestionText("");
    setQuestionMarks(1);
    setHandleSaveQuestionError("");
    setCreateNewQuizzClicked(false);
  });
  
}


useEffect(() => {
  if(question!==null)
    {
      fetchApiData(`http://192.168.10.11:8080/quizz/getQuizzDetailByQuizzID/${selectedQuizzForEditComponent?.[0]?.quizzId}`,"GET",setQuestionList,setQuestionListEror);
    }
}, [question])


const handleOptionSelection = (optionText:any) => {
  setSelectedOptionText(optionText);

  
};

useEffect(() => {
 
  if (multipleOptionTextList !== null) {
    const updatedOptions = multipleOptionTextList.map(option => {
      console.log("Selected option text:", selectedOptionText);
      console.log("Option text:", option.multipleOptionText);
      return {
        ...option,
        multipleOptionIsCorrect: option.multipleOptionText === selectedOptionText
      };
    });
    console.log("Updated options:", updatedOptions);
    setmultipleOptionTextList(updatedOptions);
  }
}, [selectedOptionText])


  return (
    <>
    <div className='w-screen h-screen  border-2 border-black overflow-scroll p-5' style={{background:'#E7CC7A'}}>
    {!isAllRequirementsCompleted&& <div className="absolute justify-end bottom-24  right-96  text-red-500 p-5  ">
        <div className='flex flex-col justify-center items-center border-2 border-black z-50  flex-wrap m-3 bg-white cursor-pointer p-5'>
        {handleSaveQuestionError}
        <div className='flex bg-black border-2 border-amber-400 uppercase font-bold text-white p-3 hover:bg-gray-500  'onClick={()=>setIsAllRequirementsCompleted(true)}>Ok</div>
        </div>
        
        </div>}



        <div className="flex flex-row justify-center" >
            <div className='felx flex-row justify-center items-center text-4xl underline underline-offset-8 text-black font-extrabold'>{selectedQuizzForEditComponent?.[0]?.quizzTitle}</div>
            <div></div>
        </div>
        <div className="mt-20 flex flex-row text-balance text black flex-wrap">
        {selectedQuizzForEditComponent?.[0]?.quizzDescription}

        </div>
       {!questionListEror? <div className='mt-11 flex flex-col m-4 '>
         
       {questionList?.map((quizz,index)=>(
    <div className='flex flex-col ' key={index}>
        <div className='flex flex-row font-bold text-xl '>{quizz.questionText}
            <div className='flex flex-row  ml-5 underline underline-offset-8'>( {quizz.questionMarks} )</div>
        </div>
        <div className='flex flex-col'>
            {quizz.multipleOptionList.map((multipleOption,index)=>(
                <div className='flex flex-row p-3 m-1' key={index}>
                    <div className='font-normal'>{multipleOption.multipleOptionText}</div>
                    {/* Debugging */}
                    <div>{JSON.stringify(multipleOption.isMultipleOptionIsCorrect)}</div>
                    {/* Conditional rendering */}
                    <div className={`text-black p-3 ml-3 ${multipleOption.isMultipleOptionIsCorrect === true ? "bg-green-400" : "bg-red-400"}`}>
                        {multipleOption?.isMultipleOptionIsCorrect ? multipleOption.isMultipleOptionIsCorrect.toString() : "false"}
                    </div>
                </div>
            ))}
        </div>
    </div>
))}


              
        </div>:<div className='m-5 flex flex-row font-bold justify-center items-center text-xl text-red-500'>
          {!questionListEror ?<div >

            No Question In this Quizz Exists
          </div>:<div>{questionListEror}</div>
}
          </div>}
        {createNewQuizzClicked && <div>
          <div className="flex flex-col bg-slate-300 border-2 border-balck rounded-lg p-6">
               <div className='flex flex-col justify-start font-medium text-sm mb-1'>Question Area</div>
              <input value={questionText} onChange={(e)=>setQuestionText(e.target.value)} type="text" placeholder='Enter Question Text' className='outline-double w-4/5 h-16  font-semibold text-orange-500' />
             <div className='flex flex-row mt-5 '>
              <div className='p-4 font-medium'>Enter Question Marks :</div>
              <input 
  type="number" 
  value={questionMarks} 
  onChange={(e) => setQuestionMarks(parseFloat(e.target.value))} // Convert string to float
  min={1} 
  className='flex flex-row ml-3 mr-3 w-16 h-12 ' 
/>

             </div>
             
              {
  multipleOptionTextList && multipleOptionTextList.length > 0 && (
    <div className='mt-9 flex flex-col'>
      <div className='flex flex-row text-lg font-bold underline underline-offset-4 uppercase'>Saved Multiple Options</div>
      {multipleOptionTextList.map((multipleOption, index) => (
        <div key={index} className='m-2 flex flex-row '>
          <input type="radio" name="multipleOption"  onClick={() => handleOptionSelection(multipleOption.multipleOptionText)} />
          {multipleOption.multipleOptionText}
          <div className='flex flex-row ml-9  cursor-pointer text-black hover:text-red-600' onClick={() => handleDeleteMultipleOptionClick(multipleOption)}><MdDeleteForever size={20} /></div>
        </div>
      ))}
      <div className='flex flex-row mt-3  text-sm text-red-500 font-medium underline'>Select  Correct Option From the Above List Before Saveing the Qustion </div>
    </div>
  )
}
             <div className=" mt-10 flex flex-col">
              <div className='justify-start text-sm font-semibold '>Multiple Option Area</div>
              <div className='flex flex-row '>

              <input placeholder='Enter Multiple Option Text' type="text" value={multipleOptionText} onChange={(e)=>setMultipleOptionText(e.target.value)}  className='m-1 outline-double font-medium w-1/2 h-10  text-sm    text-orange-500'/>
              <div onClick={handleSaveMultipleOptionClick} className='ml-4 flex flex-row cursor-pointer font-bold p-3 bg-black border-2 border-orange-500 rounded-xl text-white hover:bg-pink-900'>Save</div>
              </div>
             </div>


            <div className="flex flex-row justify-end">

          <div className='mr-5 flex flex-roe underline underline-offset-8 text-black text-lg font-bold p-3 cursor-pointer hover:text-red-500' onClick={handleCanelCreateNewQuestionButton}>Cancel</div>
          <div className='bg-black p-3 text-white cursor-pointer rounded-lg border-2 font-bold text-lg border-orange-600 hover:bg-slate-500' onClick={handleSaveQuestionClick}>Save</div>
            </div>
          </div>
          </div>}

        {/* {questonError&&<div className='flex flex-row text-red-400'>Failed to Add Question to Quizz Try Again </div>} */}
        {!createNewQuizzClicked&&<div className='mt-12 flex flex-row justify-center items-center'>

        <div onClick={handleCreateNewQuestionClicked} className=' justify-center items-center bg-black border-2 border-lime-500 rounded-lg underline underline-offset-8 cursor-pointer  text-white p-6  font-bold text-xl uppercase hover:z-50 hover:bg-orange-400'>Create New Question</div>
        </div>}
        {!createNewQuizzClicked&&<div className='mt-12 flex flex-row justify-end items-center'>

        <div onClick={handleBackClick} className='flex flex-row justify-center items-center bg-black border-2 border-lime-500 rounded-lg underline underline-offset-8 cursor-pointer  text-white p-3  font-bold text-xl uppercase hover:z-50 hover:bg-orange-400'>
          <MdOutlineArrowBack  className='mr-4' size={20}/>
          Close
          </div>
        </div>}

      

    </div>
    
    </>
  )
}

export default EditQuizz
