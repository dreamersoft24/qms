import React, { useEffect, useState } from 'react'
import { Quizz } from '../Interfaces/QuizzInterface'
import fetchApiData from '../apiFunction';
import { CiLogout } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { FaEdit } from "react-icons/fa";
import EditQuizz from './EditQuizz';
import { quizzLanguage } from '../Interfaces/QuizzLanguageInterface';
const AdminDashboard = () => {
    const [quizzList, setquizzList] = useState<quizzLanguage[]|null>(null);
    const [selectedQuizz, setSelectedQuizz] = useState<quizzLanguage|null>(null);
    const [quizzListError, setQuizzListError] = useState("");
    const [isEditComponentCalled, setIsEditComponentCalled] = useState(false);
    const [isQuizzListFound, setIsQuizzListFound] = useState(false);
    const [selectedQuizzForEditComponent, setSelectedQuizzForEditComponent] = useState<Quizz[]|null>(null);
   const [isLoaderCalled, setIsLoaderCalled] = useState<boolean>(false);
    const router =useRouter();
    
useEffect(() => {
    fetchApiData(`http://192.168.10.11:8080/quizz/getQuizzLanguageList`,"GET",setquizzList,setQuizzListError);

  }, []);

useEffect(() => {
  if(quizzList!==null &&quizzList.length>0)
    {

      setIsQuizzListFound(true);
      
    }
    else{
      setIsQuizzListFound(false);
      setquizzList(null);
    }
}, [quizzList])




function handleLogout(){
    localStorage.setItem("userID","");
        localStorage.setItem("userRoleID","");
        localStorage.setItem("isLoggedIn","false");
        router.replace("/");
        setIsLoaderCalled(true);

        
  }    

 function handleEditClick(quizz:quizzLanguage){
     if(quizz!==null)
      {
        setSelectedQuizz(quizz);
      
      }
      else{
        setSelectedQuizz(null);
      }
      
 }

useEffect(() => {
  if(selectedQuizz!==null)
    {
     
      fetchApiData(`http://192.168.10.11:8080/quizz/getQuizzListByCatID/${selectedQuizz.quizzCategoryId}`,"GET",setSelectedQuizzForEditComponent,setQuizzListError);
      

    }
    else{
      setIsEditComponentCalled(false);
    }
}, [selectedQuizz])

useEffect(() => {
  if(selectedQuizzForEditComponent!==null){
    setIsEditComponentCalled(true)
  }
  else{
    setSelectedQuizz(null);
    setIsEditComponentCalled(false);
      setSelectedQuizzForEditComponent(null)

  }
  
}, [selectedQuizzForEditComponent])

useEffect(() => {
  
  if(isEditComponentCalled===false)
    {
     setSelectedQuizzForEditComponent(null);
    }
}, [isEditComponentCalled])


  return (
    <>
    {isLoaderCalled?<div className="flex flex-row justify-center items-center text-3xl bg-slate-100 font-bold">Loading............</div>:
  <>

 {!isEditComponentCalled && 
 <div className=' w-screen h-screen flex flex-col ' style={{background:'#E7CC7A'}}>
 <div className='mt-11 m-4 flex flex-row justify-between'>
 
 <div className='w-24 h-20 rounded-full '>

 <img className='object-fill rounded-full border-4 border-slate-100 hover:border-4 hover:border-red-500'  src="/assets/images/logoforQMS.jpeg" alt="QMS" />
 </div>

          
        
        <div className='p-4 font-bold text-xl underline underline-offset-8'>Hi,Admin</div>
        <div className='p-4 flex flex-row  items-center justify-center cursor-pointer bg-white border-2 border-black rounded-xl' onClick={handleLogout}>
            <CiLogout size={25}  className='mr-3 text-black'/> 
            <div className='cursor-pointer font-bold hover:text-red-500'>
              Logout
              </div>
            </div>
 </div>
 {!isQuizzListFound &&
  <div>Loading.............</div>
}
  {isQuizzListFound &&
    !isEditComponentCalled && quizzList && quizzList.length>0 &&(
        <div className='w-full h-full flex flex-col justify-center items-center'>
        {quizzList.map((quizzL,index)=>(
         <div className='p-7  m-3  flex flex-col bg-zinc-300 rounded-lg border-2 border-black'>
            <div className='mb-10 flex flex-row font-bold text-2xl underline underline-offset-8 '>{quizzL?.quizzCategoryName}</div>
            {/* <div className='mt-3 font-light'>{quizzL?.quizzCategoryName}</div> */}
            <div className='flex flex-row justify-around items-center'>
                {/* <div className= ' cursor-pointer text-xl hover:text-red-400 hover:z-50'> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round"
   d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 
   1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 
   2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 
   48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0
    0a48.11 48.11 0 0 1 
    3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 
    0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667
     0 0 0-7.5 0" />
</svg>


                </div> */}
                <div ><FaEdit onClick={()=>handleEditClick(quizzL)} className='hover:text-orange-400 cursor-pointer' size={20}/></div>
            </div>
         </div>
        ))}
        </div>
    )
  }


     </div>
     }

{isEditComponentCalled && 
  <EditQuizz 
  setIsEditComponentCalled={setIsEditComponentCalled}
  selectedQuizzForEditComponent={selectedQuizzForEditComponent}
  setSelectedQuizzForEditComponent={setSelectedQuizzForEditComponent}
  
  />
  }

  </>
}
  </>
  )
}

export default AdminDashboard
