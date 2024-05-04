import React, { useState, useEffect } from 'react';


// Import necessary styles (assuming you're using them)
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from './DatePIcker';
import fetchApiData from '../apiFunction';

import { AttemptInterface } from '../Interfaces/AttemptInterface';
import { UserReportListInterface } from '../Interfaces/UserReportList';
import UserDetailReport from './UserDetailReport';
import fetchApiDataPost from '../apiFunctionForPost';

interface UserReportProps {
  // Add any props you need to pass to UserReport
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const UserReport: React.FC<UserReportProps> = ({ /* props */ }) => {

  
  const handleDateChange = (value:any) => {
    onChange(value);
    
  };
  const [value, onChange] = useState(new Date());
  // Optional: Log the selected date for debugging purposes
  
 const [userReportList, setUserReportList] = useState<UserReportListInterface[]|null>(null);
 const [userResponseListError, setUserResponseListError] = useState("");
 const [showUserDetailReport, setShowUserDetailReport] = useState<boolean>(false); 
 const [userReport, setUserReport] = useState<UserReportListInterface|null>(null);

 useEffect(() => {

  const userIDstr = localStorage.getItem("userID");

  let userID = null; // Declare userID outside the if block

  if (userIDstr !== null) {
    setUserReportList(null);
  userID = parseInt(userIDstr, 10); // Assign the parsed integer value to userID
  }

   fetchApiDataPost(`http://192.168.10.11:8080/report/getAllUserReportByDate/${userID}`,
   "POST",
   value,
   setUserReportList,
   setUserResponseListError
  );
   }, [value])


  function handleViewDetail(userReport:UserReportListInterface){
   setUserReport(userReport);

  }
 
  useEffect(() => {
    if(userReport!==null)
      {
        setShowUserDetailReport(true);   
      }
      else{
        setShowUserDetailReport(false);
      }
  }, [userReport])
  
  return (
    <>
    {!showUserDetailReport?
    <div>

      <div className='flex flex-row text-sm m-3'>
        <div className='m-2'>Sort By :</div>
        <DatePicker
          value={value}
          onChange={(value) => handleDateChange(value)}
          className='appearance-none shadow border rounded py-2 px-2 text-gray-darker w-60'
          closeCalendar={true}
          clearIcon
          clearAriaLabel='Clear value'
        />
      </div>
      <div className='mt-12 flex flex-row justify-center items-center overflow-y-scroll'>
        {userResponseListError&&<div className='flex flex-row justify-center items-center text-black text-xl font-bold'>No User Report for the selected Date...</div>}
      {
        userReportList &&userReportList.length>0 &&(
          <div className='flex flex-wrap '>
            {
              userReportList.map((userReport,index)=>
              (
                <div className="flex flex-col justify-center items-center p-4 m-3 border-2 border-black rounded" style={{background:'#E7CC7A'}}>
                  <div className='m-2 text-2xl font-bold underline underline-offset-8 mb-5'>{userReport.quizzTitle}</div>
                  <div className='flex flex-row text-sm '>
                    <div className='font-bold '>Attempt Date :</div>
                    <div>{userReport && userReport.attemptDate && (
        <div>{userReport.attemptDate.toString()}</div>
      )}</div>
                  </div>
                  <div className='flex flex-row text-sm'>
                     <div className='font-bold'>Total Marks :</div>
                     <div>{userReport.totalMarks}</div>
                  </div>
                  <div className='flex flex-row text-sm'>
                     <div className='font-bold'>Obtained Marks :</div>
                     <div>{userReport.obtainedMarks}</div>
                  </div>
                  
                  <div className='flex flex-row text-sm'>
                     <div className='font-bold'>Attempt Numebr :</div>
                     <div>{userReport.attemptNumber}</div>
                  </div>
                 <div className='flex flex-row justify-center items-center bg-black cursor-pointer rounded-lg border-green-500 border-2 p-3 mt-3 text-white font-bold texl-xl hover:bg-orange-400' onClick={()=>handleViewDetail(userReport)}>View Detail</div> 
                </div>
              )
              )
            }
            {}
          </div>
        )
      }
      </div> 
      </div>
      :
      <div className="flex flex-col w-full h-full overflow-scroll">
        <UserDetailReport userReport={userReport} setUserReport={setUserReport} setShowUserDetailReport={setShowUserDetailReport}/>
      </div>
}
    </>
  );
};

export default UserReport;
