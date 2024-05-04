"use client";
import React, { useEffect } from "react";
import Link from 'next/link';
import {Spinner} from "@nextui-org/spinner";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import fetchApiData from "@/components/apiFunction";
import UserDashbord from "./userComponent/UserDashbord";
import "/app/globals.css";
import { FaUserCircle } from "react-icons/fa";
import { ImKeyboard } from "react-icons/im";
import { useRouter, usePathname  } from 'next/navigation';
import { User } from "./Interfaces/UserInterface";
export const useClient = true;

const SignUp =() => {
  
  const [hidePassword, sethidePassword] = useState(false);
  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userRecord, setUserRecord] = useState<User|null>(null);
  const [isSingnedIn, setIsSingnedIn] = useState<boolean>(false);
  const [isLoaderCalled, setIsLoaderCalled] = useState<boolean>(false);
  const router=useRouter();
 
 
  const handleSignUp=()=>{

    if(!mail&&!password&&!userName)
      {
        setErrorMsg("User Name , mail And Password can'nt be Empty");

      } 
    else if(!userName&&userName==="")
      {
        setErrorMsg("User Name Can'nt be Empty");
       
      }
    else if(!mail&&mail==="")
      {
        setErrorMsg("User mail Can'nt be Empty");
       
      }
    else if(!password&&password==="")
      {
        setErrorMsg("User Password Can'nt be Empty");
      }
      else{
        // setLoggedIn(true);
        setErrorMsg("");
        fetchApiData(
          `http://192.168.10.11:8080/user/signUp/${userName}/${mail}/123`,
          "POST",
          setUserRecord,
          setErrorMsg,
        
        )
  
      }
  }
 useEffect(() => {
  if(userRecord!==null)
    {
      console.log("user ID :"+userRecord.userId);
      setIsSingnedIn(true);
      localStorage.setItem("userID",userRecord.userId.toString());
      localStorage.setItem("userRoleId",userRecord.userRoleId.toString());
      localStorage.setItem("isLoggedIn","true");
      if(userRecord.userRoleId===2)
        {
          router.replace("/Admin");
          setIsLoaderCalled(true);      

        }
        else if(userRecord.userRoleId===1)
          {
            router.replace("/User");
            setIsLoaderCalled(true);
          }
    }
    else{
      setIsSingnedIn(false);
      localStorage.setItem("userID","");
      localStorage.setItem("userRoleId","");
      localStorage.setItem("isLoggedIn","false");
    }
 }, [userRecord])
 
  return (
    <>
    {isLoaderCalled?<div className="flex flex-row justify-center items-center text-3xl bg-slate-100 font-bold">Loading............</div>: 
       <> 
       {isSingnedIn?<div className="flex flex-row justify-center items-center">Loading....
        <Spinner label="SuccessFull"/>
       </div>:
        <>{
      <div className="w-screen h-screen bg-amber-200 flex flex-col items-center justify-around">
        <div

          className="flex flex-row irishGrover text-6xl">
          Begin<img src="/assets/images/steps.png" alt="pic" className="object-fill w-10 h-10 mt-2 mr-2" /> your <img src="/assets/images/pointingTowards.png" alt="book pic" />Learning!<img src="/assets/images/learning.png" className="object-fill w-10 h-10 ml-2"/>
        </div>
        <div className="p-5 flex flex-col justify-evenly items-center  rounded-lg w-1/2 h-1/2 bg-slate-200">
          <div className="p-2 flex flex-row w-3/4 h-11 border border-black bg-green-300 rounded-xl items-center">
          <ImKeyboard size={20}/><input onChange={(e)=>setUserName(e.target.value)} type="text" className="bg-transparent placeholder-slate-900 w-4/5 h-9 ml-4 hover:outline-none hover:border-none outline-none" placeholder="Enter Your Name" /><FaUserCircle size={20}/>
          </div>
          <div className="p-2 flex flex-row w-3/4 h-11 border border-black bg-green-300 rounded-xl items-center">
            <img src="/assets/images/keyBoard.png" className="w-6" alt="KeyP" /><input onChange={(e)=>setMail(e.target.value)} type="text" className="bg-transparent placeholder-slate-900 w-4/5 h-9 ml-4 hover:outline-none hover:border-none outline-none" placeholder="user@gmial.com" /><img src="/assets/images/mail.png" className="w-6" alt="MailP" />
          </div>
          <div className="p-2  flex flex-row w-3/4 h-11 border border-black bg-green-300 rounded-xl items-center">
            <img src="/assets/images/lock.png" className="w-6" alt="KeyP" /><input onChange={(e)=>setPassword(e.target.value)} type={hidePassword ? "password" : "text"} className="bg-transparent placeholder-slate-900 w-4/5 h-9 ml-4 hover:outline-none hover:border-none outline-none" placeholder="Enter Password" />{hidePassword ? <AiFillEyeInvisible size={25} onClick={() => sethidePassword(false)} /> : <AiFillEye onClick={() => sethidePassword(true)} size={25} />}
          </div>

          {errorMsg && <p className=" text-red-500">{errorMsg}</p>}
          <div className="flex flex-col mt-2 ">
            <div className="mb-1 p-1 items-center justify-center font-semibold flex rounded bg-black text-white text-xl cursor-pointer hover:bg-slate-600" onClick={handleSignUp}>SignUp</div>
            <Link href={"/"}>
              <div onClick={()=>setIsLoaderCalled(true)} className=" flex rounded font-semibold text-sky-600  cursor-pointer hover:text-sky-950">Already Have an Account?</div>
            </Link>
          </div>
        </div>
      </div>}
      </>
}
      </>
}
      </>
  );
}

export default SignUp;
