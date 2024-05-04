"use client"
import React, { useEffect, useState } from 'react';
import UserDashboardSideBar from './UserDashboardSideBar';
import SelectLanguageComponent from './SelectLanguageComponent';
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';

import fetchApiData from '../apiFunction';
import CreateNewQuizzComponent from './CreateNewQuizzComponent';

import { User } from '../Interfaces/UserInterface';
import { Quizz } from '../Interfaces/QuizzInterface';
import UserReport from './UserReport';
import PremiumAccount from './PremiumAccount';
import AboutUs from './AboutUs';


const UserDashbord = () => {
 
  const [isCreateQuizzClicked, setIsCreateQuizzClicked] = useState<boolean>(false);
  const [isUserReportClicked, setIsUserReportClicked] = useState<boolean>(true);
  const [isPremiumAccontClicked, setIsPremiumAccontClicked] = useState<boolean>(false);
  const [quizzLanguageList, setQuizzLanguageList] = useState<quizzLanguage[] | null>(null);
  const [languageError, setLanguageError] = useState("");
  const [isAboutUsClicked, setisAboutUsClicked] = useState<boolean>(false);
 
  useEffect(() => {   
  
//   const  dummyQuizzLanguages: quizzLanguage[] = [
//     {
//         quizzCategoryId: 1,
//         quizzCategoryName: "English",
//         isDeleted: false,
//     },
//     {
//         quizzCategoryId: 2,
//         quizzCategoryName: "Sawahi",
//         isDeleted: false,
//     }  
// ];
   fetchApiData("http://192.168.10.11:8080/quizz/getQuizzLanguageList","GET",setQuizzLanguageList,setLanguageError);
// setQuizzLanguageList(dummyQuizzLanguages);  

}, []);


  
  



  return (
    <>
      {!languageError ? (
        <div className="flex flex-row w-screen h-screen">
          
          <div className="flex flex-col w-[20%] border-r-2 border-r-black items-center">


            <UserDashboardSideBar
              isUserReportClicked={isUserReportClicked}
              setIsUserReportClicked={setIsUserReportClicked}
              isCreateQuizzClicked={isCreateQuizzClicked}
              setIsCreateQuizzClicked={setIsCreateQuizzClicked}
              isPremiumAccontClicked={isPremiumAccontClicked}
              setIsPremiumAccontClicked={setIsPremiumAccontClicked}
              isAboutUsClicked={isAboutUsClicked}
              setisAboutUsClicked={setisAboutUsClicked}
           />
          </div>
          <div className="flex flex-col w-[80%]  ">
            {quizzLanguageList && quizzLanguageList.length > 0 && (
             
             isCreateQuizzClicked? <CreateNewQuizzComponent
                quizzLanguageList={quizzLanguageList}
              />
            :isAboutUsClicked?<AboutUs/>:isPremiumAccontClicked?
            <PremiumAccount
            setIsPremiumAccontClicked={setIsPremiumAccontClicked}
            /> 
            : <UserReport/>
             
            )}
           
            {!quizzLanguageList || quizzLanguageList.length === 0 ? (
              <p>Loading...</p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className='flex text-3xl font-bold'>{languageError}</div>
      )}
    </>
  );
};

export default UserDashbord;
