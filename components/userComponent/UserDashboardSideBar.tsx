import React, { useState } from 'react'
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { FaCrown } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
const UserDashboardSideBar = (props:any) => {
  const [isLogedOutCalled, setIsLogedOutCalled] = useState<boolean>(false);
    const {isUserReportClicked,setIsUserReportClicked,isCreateQuizzClicked,setIsCreateQuizzClicked,isPremiumAccontClicked,setIsPremiumAccontClicked,isAboutUsClicked,setisAboutUsClicked}=props;
   
   
    const router=useRouter();
   function handleCreateQuizzClicked(){
    setIsUserReportClicked(false);
    setIsPremiumAccontClicked(false);
    setisAboutUsClicked(false);
    setIsCreateQuizzClicked(true);

  }

  function handlePremiumAccountClick(){
  
    setIsUserReportClicked(false);
    setIsCreateQuizzClicked(false);
    setisAboutUsClicked(false);
    setIsPremiumAccontClicked(true)
  }

  function handleUserReportQuizz(){
    setIsCreateQuizzClicked(false);
    setIsPremiumAccontClicked(false);
    setisAboutUsClicked(false);
    setIsUserReportClicked(true);
  }
  function handleAboutUsClicked(){
  
    setIsCreateQuizzClicked(false);
    setIsPremiumAccontClicked(false);
    setIsUserReportClicked(false);
    setisAboutUsClicked(true);
  }
  function handleLogout(){
    localStorage.setItem("userID","");
        localStorage.setItem("userRoleID","");
        localStorage.setItem("isLoggedIn","false");
        localStorage.clear();
        setIsLogedOutCalled(true);
        router.replace("/")
        
  }
  


    return (
    <>
    {isLogedOutCalled?<div className='flex flex-row items-center justify-center bg-slate-50 text-3xl h-screen w-screen'>Logging Out ........</div>:
    <div className="flex flex-col w-full h-full items-center bg-gray-300  overflow-scroll">
        {/* this is the Logo Section QMS */}
        <div className='mt-11 w-24 h-20 rounded-full '>

 <img className='object-fill rounded-full border-4 border-slate-100 hover:border-4 hover:border-red-500'  src="/assets/images/logoforQMS.jpeg" alt="QMS" />
 </div>
        <div className="flex flex-col mt-24 justify-center">
            <div className={`p-6 text-xl font-bold border-t-2 border-t-black w-60 cursor-pointer  ${isCreateQuizzClicked?'bg-amber-500':'bg-transparent'} hover:bg-amber-400`} onClick={handleCreateQuizzClicked}>
           
            Create New Quizz
            
            </div>
    
            <div className={`p-6 text-xl font-bold border-t-2 border-t-black border-b-2 border-b-black w-60 cursor-pointer ${isUserReportClicked? 'bg-amber-500':'bg-transparent'} hover:bg-amber-400`} onClick={handleUserReportQuizz}>
           
            User Report
            
            </div>
            <div className={`p-2  justify-around  flex flex-row border-b-2 border-b-black w-60 cursor-pointer ${isPremiumAccontClicked? 'bg-amber-500':'bg-transparent'} hover:bg-amber-400 hover:text-black`} onClick={handlePremiumAccountClick}>
           <div className='font-bold text-xl  '>

            Premium
           </div>
            <FaCrown   size={30}/>
            
            </div>
            <div className={`p-6   flex flex-row border-b-2 border-b-black w-60 cursor-pointer ${isAboutUsClicked? 'bg-amber-500':'bg-transparent'} hover:bg-amber-400 hover:text-black`} onClick={handleAboutUsClicked}>
           <div className='font-bold text-xl flex flex-row'>

            <FcAbout  className='m-1' size={25}/>
            About US
           </div>
            
            </div>

    
        </div>
        <div className='absolute bottom-3 left-3 text-balck text-lg font-bold'>
          <div className='flex flex-col'>
          
         
          {/* <div className='flex flex-row cursor-pointer mb-3' onClick={handleAboutUsClicked}>
            <FcAbout  size={25}  className='mr-3 text-black'/> 
            <div className={`cursor-pointer ${isAboutUsClicked?"text-amber-400":"text-black"} hover:text-slate-800`}>
              About Us
              </div>
            </div> */}
          <div className='flex flex-row cursor-pointer' onClick={handleLogout}>
            <CiLogout size={25}  className='mr-3 text-black'/> 
            <div className='cursor-pointer hover:text-red-500'>
              Logout
              </div>
            </div>
            </div>
        </div>
    </div>}
    </>
  )
}

export default UserDashboardSideBar
