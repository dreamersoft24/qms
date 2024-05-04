import React, { useEffect, useState } from 'react'
import { UserReportListInterface } from '../Interfaces/UserReportList'
import { UserDetailAttemptList } from '../Interfaces/UserDetailAttemptList'
import fetchApiData from '../apiFunction'
import { useRouter } from 'next/navigation'
interface Props{
    userReport:UserReportListInterface|null,
    setShowUserDetailReport:React.Dispatch<React.SetStateAction<boolean>>
    setUserReport:React.Dispatch<React.SetStateAction<UserReportListInterface|null>>;  
  }
const UserDetailReport:React.FC<Props> = ({ 
    userReport,
    setShowUserDetailReport,
    setUserReport
}) => {


const [UserDetailReport, setUserDetailReport] = useState<UserDetailAttemptList[]|null>(null);
const [userDetailReportError, setUserDetailReportError] = useState("");
const router=useRouter();
useEffect(() => {
  fetchApiData(`http://192.168.10.11:8080/report/getUserDetailReportByAttemptID/${userReport?.attemptID}`,"GET",setUserDetailReport,setUserDetailReportError);
// const dummyData: UserDetailAttemptList[] = [
//     {
//       questionText: "What is the capital of France?",
//       multipleOptionText: "Paris",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "Which planet is known as the Red Planet?",
//       multipleOptionText: "Mars",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the largest mammal?",
//       multipleOptionText: "Elephant",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "What is the chemical symbol for water?",
//       multipleOptionText: "H2O",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "Who wrote 'Romeo and Juliet'?",
//       multipleOptionText: "William Shakespeare",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "What is the capital of Japan?",
//       multipleOptionText: "Tokyo",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the currency of Brazil?",
//       multipleOptionText: "Brazilian real",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "How many continents are there?",
//       multipleOptionText: "7",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the tallest mountain in the world?",
//       multipleOptionText: "Mount Everest",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "What is the largest ocean on Earth?",
//       multipleOptionText: "Pacific Ocean",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the chemical symbol for gold?",
//       multipleOptionText: "Au",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "Who painted the Mona Lisa?",
//       multipleOptionText: "Leonardo da Vinci",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the capital of Australia?",
//       multipleOptionText: "Canberra",
//       multipleOptoinStatus: true
//     },
//     {
//       questionText: "What is the square root of 144?",
//       multipleOptionText: "12",
//       multipleOptoinStatus: false
//     },
//     {
//       questionText: "Who discovered gravity?",
//       multipleOptionText: "Isaac Newton",
//       multipleOptoinStatus: true
//     },
//   ];
//   setUserDetailReport(dummyData);

}, [])

function handleBackButton(){
  setShowUserDetailReport(false);
  setUserReport(null);
  router.refresh
}
  return (
    <div className='overflow-scroll flex flex-col  w-full h-full p-5 ' >
      <div className="flex flex-row justify-center items-center m-3 text-3xl font-bold underline underline-offset-8 text-black">{userReport?.quizzTitle}</div>
    <div className="flex flex-row">

    
    <div className="mt-10 flex flex-row text-lg text-black">
        <div className='font-bold underline underline-offset-8'>Attempt Date :</div>
        <div>{userReport?.attemptDate.toString()}</div>
    </div>
    
    <div className="ml-5 mt-10 flex flex-row text-lg text-black">
        <div className='font-bold underline underline-offset-8'>Attempt Number :</div>
        <div>{userReport?.attemptNumber}</div>
    </div>

    </div>
    <div className="m-2 flex flex-row text-lg text-black justify-end">
        <div className='font-bold underline underline-offset-8'>Obtained Marks :</div>
        <div>{userReport?.obtainedMarks}</div>
    </div>
    <div className="m-2 flex flex-row text-lg text-black justify-end">
        <div className='font-bold underline underline-offset-8'>Total Marks :</div>
        <div>{userReport?.totalMarks}</div>
    </div>

    
  <div className="flex flex-col">
   {
    UserDetailReport &&UserDetailReport.length>0&&(
        <div className="flex flex-col">
{
    UserDetailReport.map((userDetail,index)=>(
     <div className="flex flex-col p-4 m-2 border border-black">
      <div>Question NO : {index+1}</div>
        <div className="flex flex-row text-xl mt-5 mb-5 font-bold">{userDetail.questionText}</div>
        <div className="flex flex-row ml-4 ">
            <div>{userDetail.multipleOptionText}</div>
            <div className={`${userDetail.multipleOptoinStatus?"bg-lime-500":"bg-red-500"} ml-16  text-black font-bold`}>{userDetail.multipleOptoinStatus?"Correct":"Wrong"}</div>
        </div>
     </div>
    ))
}

        </div>
    )
   }
  </div>
      <div className='absolute bottom-3 right-3 bg-black p-4 m-3 text-white font-bold text-lg cursor-pointer rounded-lg border-2 border-rose-500 hover:bg-orange-400 'onClick={handleBackButton}>Back</div>
    </div>
  )
}

export default UserDetailReport
