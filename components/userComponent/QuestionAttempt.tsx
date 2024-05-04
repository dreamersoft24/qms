import React, { useEffect, useState } from 'react'
import { QuestionInterface } from '../Interfaces/Question';
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';
import { Quizz } from '../Interfaces/QuizzInterface';
import { multipleOptionInterface } from '../Interfaces/MultipleOptionInterface';
import { useRouter } from 'next/navigation';
import fetchApiData from '../apiFunction';
import { AttemptInterface } from '../Interfaces/AttemptInterface';

import UserDashbord from './UserDashbord';
import CreateNewQuizzComponent from './CreateNewQuizzComponent';
import { UserResponseInterface } from '../Interfaces/UserResponseInterface';
import fetchApiDataPost from '../apiFunctionForPost';

interface Props{
    isLanguageSelected:boolean;
    isQuestionNumberSelected:boolean;
    selectedLanguage:quizzLanguage|null;
    selectedQustionNumber:number;
    quizz:Quizz[]|null;
    quizzLanguageList: quizzLanguage[] | null,
    setisLanguageSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setIsQuestionNumberSelected:React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLanguage:React.Dispatch<React.SetStateAction<quizzLanguage|null>>;
    setSelectedQustionNumber:React.Dispatch<React.SetStateAction<number>>;
}
const QuestionAttempt:React.FC<Props> = ({
    isLanguageSelected,
    isQuestionNumberSelected,
    selectedLanguage,
    selectedQustionNumber,
    quizz,
    quizzLanguageList,
    setisLanguageSelected,
    setIsQuestionNumberSelected,
    setSelectedLanguage,
    setSelectedQustionNumber
    
}) => {
    const [questionList, setQuestionList] = useState<QuestionInterface[]|null>(null);
    const [questionListError, setquestionListError] = useState("");
    const [isQuestionFound, setIsQuestionFound] = useState<boolean>(false);
    const [multipleOptionList, setmultipleOptionList] = useState<multipleOptionInterface[]|null>(null)
    const [multipleOptionsError, setMultipleOptionsError] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | null }>({});
    const [isAllQuestionAttempted, setIsAllQuestionAttempted] = useState<boolean>(false);
    const [userAttempt, setUserAttempt] = useState<AttemptInterface|null>(null);
    const [userAttemptError, setUserAttemptError] = useState("");
   const [userResponse, setUserResponse] = useState<UserResponseInterface[]|null>(null);
   const [userResponseError, setUserResponseError] = useState("");
   
   const router=useRouter();
    useEffect(() => {
        if(questionList!==null)
         {
           setIsQuestionFound(true);
         }
         else{
           setIsQuestionFound(false);
         }
      }, [questionList])
      useEffect(() => {
        if(isLanguageSelected&&isQuestionNumberSelected&& quizz && quizz.length > 0)
         {
     
           console.log("create new Quizz fetching random Question "+quizz[0].quizzCategoryId);
           fetchApiData(`http://192.168.10.11:8080/quizz/question/getRandomQuestionByNumber/${quizz[0].quizzId}/${selectedQustionNumber}`,
           "GET",
           setQuestionList,
           setMultipleOptionsError
         );
         // const dummyQuestions: QuestionInterface[] = [
         //   {
         //     questionId: 1,
         //     questionText: "What is the capital of France?",
         //     questionMarks: 5,
         //     isDeleted: false,
         //     quizzId: 1
         //   },
         //   {
         //     questionId: 2,
         //     questionText: "Who painted the Mona Lisa?",
         //     questionMarks: 10,
         //     isDeleted: false,
         //     quizzId: 1
         //   },
         //   {
         //     questionId: 3,
         //     questionText: "What year did the Titanic sink?",
         //     questionMarks: 7,
         //     isDeleted: false,
         //     quizzId: 2
         //   },
         //   // Add more dummy questions as needed
         // ];
         // setQuestionList(dummyQuestions);
        //  const dummyEnglishQuestions: QuestionInterface[] = [
        //     {
        //         questionId: 1,
        //         questionText: "Who wrote 'Romeo and Juliet'?",
        //         questionMarks: 10,
        //         isDeleted: false,
        //         quizzId: 1,
        //     },
        //     {
        //         questionId: 2,
        //         questionText: "What is the capital of England?",
        //         questionMarks: 5,
        //         isDeleted: false,
        //         quizzId: 1,
        //     },
        //     {
        //         questionId: 3,
        //         questionText: "Who is the author of 'To Kill a Mockingbird'?",
        //         questionMarks: 8,
        //         isDeleted: false,
        //         quizzId: 1,
        //     },
           
        // ];
        // setQuestionList(dummyEnglishQuestions);
         }
      }, [])
      
useEffect(() => {
  if(questionList!==null && questionList.length>=1)
    {

        questionList.forEach(element=>(
console.log("question Text  : "+element.questionText)
        ));
        

      fetchApiDataPost(
        "http://192.168.10.11:8080/quizz/question/getMultipleOptionsListByQustionList",
        "POST",
        questionList,
        setmultipleOptionList,
        setMultipleOptionsError
    

      );

        // fetchApiData(`http://192.168.10.11:8080/quizz/question/getRandomQuestionByNumber/${quizz?.[0]?.quizzId}/${selectedQustionNumber}`,
        //    "GET",
        //    setmultipleOptionList,
        //    setquestionListError
        //  );

        //  const dummyMultipleOptions: multipleOptionInterface[] = [
        //     // Options for the first question
        //     {
        //         multipleOptionId: 1,
        //         multipleOptionText: "William Shakespeare",
        //         multipleOptionIsCorrect: true,
        //         isDeleted: false,
        //         questionId: 1,
        //     },
        //     {
        //         multipleOptionId: 2,
        //         multipleOptionText: "Charles Dickens",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 1,
        //     },
        //     {
        //         multipleOptionId: 3,
        //         multipleOptionText: "Jane Austen",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 1,
        //     },
        //     // Options for the second question
        //     {
        //         multipleOptionId: 4,
        //         multipleOptionText: "London",
        //         multipleOptionIsCorrect: true,
        //         isDeleted: false,
        //         questionId: 2,
        //     },
        //     {
        //         multipleOptionId: 5,
        //         multipleOptionText: "Paris",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 2,
        //     },
        //     {
        //         multipleOptionId: 6,
        //         multipleOptionText: "New York",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 2,
        //     },
        //     // Options for the third question
        //     {
        //         multipleOptionId: 7,
        //         multipleOptionText: "Harper Lee",
        //         multipleOptionIsCorrect: true,
        //         isDeleted: false,
        //         questionId: 3,
        //     },
        //     {
        //         multipleOptionId: 8,
        //         multipleOptionText: "Mark Twain",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 3,
        //     },
        //     {
        //         multipleOptionId: 9,
        //         multipleOptionText: "J.K. Rowling",
        //         multipleOptionIsCorrect: false,
        //         isDeleted: false,
        //         questionId: 3,
        //     },
        //     // Add more dummy options as needed
        // ];
        // setmultipleOptionList(dummyMultipleOptions);
        
    }
}, [questionList])


  // Handle selected option change
  const handleOptionChange = (questionId: number, optionId: number) => {
    setSelectedOptions({
        ...selectedOptions,
        [questionId]: optionId
    });

    
};

    const handleCancelQuizz=()=>{
        // <CreateNewQuizzComponent quizzLanguageList={quizzLanguageList}/>
        setSelectedLanguage(null);
        setSelectedQustionNumber(1);
        setQuestionList(null);
        setmultipleOptionList(null);
        setUserResponse(null);
        setisLanguageSelected(false);
        setIsQuestionNumberSelected(false);

        
       
    }

    const handleOnSubmitQuizz = () => {
        // Check if all questions have been attempted
    const allQuestionsAttempted =
    questionList !== null &&
    questionList.every(question => selectedOptions[question.questionId] !== undefined && selectedOptions[question.questionId] !== null);

console.log("all questions attempted: " + allQuestionsAttempted);

    const userIDstr = localStorage.getItem("userID");

    let userID = null; // Declare userID outside the if block

    if (userIDstr !== null) {
    userID = parseInt(userIDstr, 10); // Assign the parsed integer value to userID
    }

        // If all questions have been attempted, proceed with submission
        if (allQuestionsAttempted===true) {
        setIsAllQuestionAttempted(true);
               fetchApiData(`http://192.168.10.11:8080/quizz/addNewAttempt/${userID}/${quizz?.[0]?.quizzId}`,
           "POST",
           setUserAttempt,
           setUserAttemptError
         );
        // const attemptData: AttemptInterface = {
        //     attemptId: 1,
        //     attemptNumber: 1,
        //     attemptDateTime: new Date("2024-04-24T08:00:00Z"),
        //     isDeleted: false,
        //     quizzId: 123,
        //     userId: 456
        // };
        // setUserAttempt(attemptData);
        
        
        }
        
        else if(allQuestionsAttempted===false) {
            // If not all questions have been attempted, display an error message
            setIsAllQuestionAttempted(false);
            
        }
        
        


    };


useEffect(() => {
    const selectedOptionIds = questionList?.map(question => selectedOptions[question.questionId]);
    if(!userAttemptError)
    {
    fetchApiDataPost(`http://192.168.10.11:8080/report/addNewUserReport/${userAttempt?.attemptId}`,
       "POST",
       selectedOptionIds,
       setUserResponse,
       setUserResponseError
     );
       
      
   

    }
}, [userAttempt])

useEffect(() => {
    if(userResponse!==null)
        {
      
    setSelectedLanguage(null);
    setSelectedQustionNumber(1);
    setQuestionList(null);
    setmultipleOptionList(null);
    setUserResponse(null);
    setisLanguageSelected(false);
    setIsQuestionNumberSelected(false);
    setUserResponse(null);
        }
}, [userResponse])


    //   useEffect(() => {
    //     Object.values(selectedOptions).forEach(optionId => {
    //         console.log("selected multiple option : "+optionId);
    //     });
        
        
        
    //   }, [selectedOptions])
      
       


   
useEffect(() => {
  if(multipleOptionList){
    multipleOptionList.forEach(element => {
        console.log("Multiple Option Name :"+element.multipleOptionText);
    });
  }
}, [multipleOptionList])


    return (
    <>
      {!isAllQuestionAttempted&& <div className="absolute justify-center items-center   text-red-500 p-5  ">
        <div className='flex flex-col justify-center items-center border-2 border-black z-50  flex-wrap m-3 bg-white cursor-pointer p-5'>
        Attemp all Questions Before Submiting the Quizz
        <div className='flex bg-black border-2 border-amber-400 uppercase font-bold text-white p-3 hover:bg-gray-500  'onClick={()=>setIsAllQuestionAttempted(true)}>Ok</div>
        </div>
        
        </div>}
    <div className="flex flex-col w-full h-full">
     
    
    <div className="flex flex-row justify-end font-extrabold text-blue-500 outline-4 text-3xl outline-slate-950">Never Give UP</div>
    <div className='flex flex-col w-full h-full m-2 p-4  overflow-scroll' >
      {/* style={{background:'#E7CC7A'}} */}
     
     <div>
        <div className="flex flex-row  justify-center items-center text-3xl font-bold underline p-3 underline-offset-8">{quizz?.[0]?.quizzTitle}</div>
        <div className="mt-10 flex flex-row items-start text-sm font-medium ">{quizz?.[0].quizzDescription}</div>
        <div className="flex flex-row items-start justify-end text-sm text-red-600 font-bold underline underline-offset-8 mt-10">Understanding the Question Is  The Part of Quizz</div>
     </div>
     <div className='mt-10 mb-16 items-start '>
     {isQuestionFound?
     (questionList?.map((question,index)=>(
      <div className='m-4 flex flex-col justify-center p-4 border border-black rounded-lg'>
        <div key={question.questionId}>
          <div >Question NO : {index+1}</div>
            <p className='flex flex-row text-xl font-bold'>{question.questionText}</p>
        
        <div className="flex flex-col m-3">

       
        {
            multipleOptionList && 
            multipleOptionList
            .filter(option=>option.questionId===question.questionId)
            .map(option=>(
                <div key={option.multipleOptionId} className='felx ml-3 mr-3 text-sm'>
                <input  className='m-2 size-5' 
                type="radio"
                id={`option_${option.multipleOptionId}`}
                name={`question_${question.questionId}`} // Same name for all radio buttons in this question
                value={option.multipleOptionText}
                checked={selectedOptions[question.questionId] === option.multipleOptionId}
                onChange={() => handleOptionChange(question.questionId, option.multipleOptionId)}
                />
                <label htmlFor={`option_${option.multipleOptionId}`} className='text-lg'>
                 {option.multipleOptionText}
                 </label>
                </div>
            ))

        }
     </div>
        </div>
        </div>
     )))
     :(<div className='flex flex-row justify-center items-center text-6xl font-bold '>Sorry!  No Question Found</div>)}
    </div>
    
    {isQuestionFound &&<div className="absolute right-1 justify-end  bottom-1 m-4 mt-12">
        <div className="flex flex-row justify-between p-3 ">
            <div className='flex flex-row text-lg font-bold underline  cursor-pointer uppercase mr-3 p-3 hover:text-red-500' onClick={handleCancelQuizz}>cancel</div>
            <div className='flex flex-row border-2 border-black rounded-lg p-3 cursor-pointer uppercase font-bold hover:border-2 hover:border-lime-500 hover:bg-gray-950 hover:text-white' onClick={handleOnSubmitQuizz}>Submit</div>
        </div>
        </div>}

    </div>
    </div>
    </>
  );
}

export default QuestionAttempt
