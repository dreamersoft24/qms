"use client"
import React, { useEffect, useState } from 'react'
import SelectLanguageComponent from './SelectLanguageComponent'
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';
import SelectQNumber from './SelectQNumber';
import fetchApiData from '../apiFunction';
import { Quizz } from '../Interfaces/QuizzInterface';
import { QuestionInterface } from '../Interfaces/Question';
import QuestionAttempt from './QuestionAttempt';

interface Props {
    quizzLanguageList: quizzLanguage[] | null;
  }
const CreateNewQuizzComponent:React.FC<Props>=({
    quizzLanguageList
}) => {
    const [isLanguageSelected, setisLanguageSelected] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<quizzLanguage|null>(null);
  const [isQuestionNumberSelected, setIsQuestionNumberSelected] = useState<boolean>(false);
  const [selectedQustionNumber, setSelectedQustionNumber] = useState<number>(1);
  const [quizz, setQuizz] = useState<Quizz[]|null>(null);
  const [quizzByCategoryError, setquizzByCategoryError] = useState("");
  useEffect(() => {
   if(isLanguageSelected!==null&&selectedLanguage!==null&&selectedLanguage.quizzCategoryId>=1)
    {
    //   const dummyQuizzes: Quizz[] = [
    //     {
    //         quizzId: 1,
    //         quizzTitle: "English Quiz",
    //         quizzDescription: "Test your knowledge of English events!",
    //         isDeleted: false,
    //         userId: 1,
    //         quizzCategoryId: 1,
    //         quizzStatusid: 1,
    //     }
    // ];
      fetchApiData(`http://192.168.10.11:8080/quizz/getQuizzListByCatID/${selectedLanguage?.quizzCategoryId}`,
      "GET",
      setQuizz,
      setquizzByCategoryError
    );
  //  setQuizz(dummyQuizzes);
  }

  console.log("Selected Language ID From Create New Quizz :"+selectedLanguage?.quizzCategoryId);
 }, [isLanguageSelected])
 
 

  return (
    <>
    
    <div className='flex flex-row justify-center items-center w-full h-full'>
     
   
    {!isLanguageSelected && !isQuestionNumberSelected &&
      <div className=' p-8 w-80 h-48  rounded' style={{ backgroundColor: '#E7CC7A' }}>
      <SelectLanguageComponent 
       isLanguageSelected={isLanguageSelected}
       setisLanguageSelected={setisLanguageSelected}
       selectedLanguage={selectedLanguage}
       setSelectedLanguage={setSelectedLanguage}
       quizzLanguageList={quizzLanguageList}
       />
       </div>
    }
   
    {isLanguageSelected && !isQuestionNumberSelected &&
    <div className=' p-8 w-80 h-48  rounded' style={{ backgroundColor: '#E7CC7A' }}>
    <SelectQNumber
   
    setIsQuestionNumberSelected={setIsQuestionNumberSelected}
    selectedQustionNumber={selectedQustionNumber}
    setSelectedQustionNumber={setSelectedQustionNumber}
    />
    </div>    
    }

   {quizzByCategoryError && (
     <p>Error fetching quizz list: {quizzByCategoryError}</p>
     )}
   
     {isLanguageSelected && isQuestionNumberSelected &&
      <QuestionAttempt
      isLanguageSelected={isLanguageSelected}
      isQuestionNumberSelected={isQuestionNumberSelected}
      selectedLanguage={selectedLanguage}
      selectedQustionNumber={selectedQustionNumber}
      quizz={quizz}
      quizzLanguageList={quizzLanguageList}      
      setisLanguageSelected={setisLanguageSelected}
      setIsQuestionNumberSelected={setIsQuestionNumberSelected}
      setSelectedLanguage={setSelectedLanguage}
      setSelectedQustionNumber={setSelectedQustionNumber}
      />
      }
    </div>
    </>
  )
}

export default CreateNewQuizzComponent
