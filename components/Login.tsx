"use client"
import React, { useContext, useEffect } from "react";
import Link from 'next/link';
import {Spinner} from "@nextui-org/spinner";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import fetchApiData from "@/components/apiFunction";
import UserDashbord from "./userComponent/UserDashbord";
import { useRouter, usePathname  } from 'next/navigation';
export const useClient = true;

import { User } from "./Interfaces/UserInterface";
import { useUser } from "./UserContext";

const Login =() => {
  

  const [hidePassword, sethidePassword] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userRecord, setUserRecord] = useState<User|null>(null);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [isLoaderCalled, setIsLoaderCalled] = useState<boolean>(false);
  const router=useRouter();
 
  const handleMailChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setMail(e.target.value);
    console.log("Mail: "+e.target.value);
  }
  const handlePasswordChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
    console.log("Password: "+e.target.value);
  }

  const handleLogin=()=>{

    if(!mail&&!password)
      {
        setErrorMsg("User mail And Password can'nt be Empty");

      } 
    else if(!mail)
      {
        setErrorMsg("User mail Can'nt be Empty");
       
      }
    else if(!password)
      {
        setErrorMsg("User Password Can'nt be Empty");
      }
      else{
        // setLoggedIn(true);
        setErrorMsg("");
        fetchApiData(
          `http://192.168.10.11:8080/user/login/${mail}/${password}`,
          "GET",
          setUserRecord,
          setErrorMsg,
        
        )
        
      }
  }
 useEffect(() => {
  if(userRecord!==null)
    {
        setisLoggedIn(true);
        localStorage.setItem("userID",userRecord.userId.toString());
        localStorage.setItem("userRoleID",userRecord.userRoleId.toString());
        localStorage.setItem("isLoggedIn","true");
        const a =localStorage.getItem("userID");
   
        console.log("user Record login Page  form the localStorage:"+userRecord.userRoleId);
        if(userRecord.userRoleId===2){

          router.push("/Admin");
          setIsLoaderCalled(true);
        }
        else if(userRecord.userRoleId===1){

          router.push("/User");
          setIsLoaderCalled(true);
        }
      
      }
    else{
      setisLoggedIn(false);
        localStorage.setItem("userID","");
        localStorage.setItem("userRoleID","");
      localStorage.setItem("isLoggedIn","false");
    }
 }, [userRecord])
 
  return (
 <>
 
    {isLoaderCalled?<div className="flex flex-row justify-center items-center text-3xl bg-slate-100 font-bold">Loading............</div>:
       <>
    {isLoggedIn?<div className="flex flex-row justify-center items-center w-full h-full bg-white">
      Loading.....
    <Spinner label="Successfull"/>
    </div>:
        <div  className="w-screen h-screen bg-amber-200 flex flex-col items-center justify-around">
        {/* <div className="irishGrover">Iriish Grover</div> */}
        {/* <div

          className="flex flex-row irishGrover text-6xl">
       
          Happy<img src="/assets/images/smiingFace.png" alt="pic" className="object-fill" />     Learning<img src="/assets/images/books.png" alt="book pic" />
        </div> */}
        <div className="w-40 rounded-full">
          <img className="rounded-full" src="/assets/images/logoforQMS.jpeg" alt="img Logo" />
        </div>
        <div className="p-5 flex flex-col justify-evenly items-center  rounded-lg w-1/2 h-1/2 bg-slate-200">
          <div className="p-2 flex flex-row w-3/4 h-11 border border-black bg-green-300 rounded-xl items-center">
            <img src="/assets/images/keyBoard.png" className="w-8" alt="KeyP" /><input onChange={handleMailChange} type="text" className="bg-transparent placeholder-slate-900 w-4/5 h-9 ml-4 hover:outline-none hover:border-none outline-none" placeholder="user@gmial.com" /><img src="/assets/images/mail.png" className="w-8" alt="MailP" />
          </div>
          <div className="p-2  flex flex-row w-3/4 h-11 border border-black bg-green-300 rounded-xl items-center">
            <img src="/assets/images/lock.png" className="w-8" alt="KeyP" /><input onChange={handlePasswordChange} type={hidePassword ? "password" : "text"} className="bg-transparent placeholder-slate-900 w-4/5 h-9 ml-4 hover:outline-none hover:border-none outline-none" placeholder="Enter Password" />{hidePassword ? <AiFillEyeInvisible size={25} onClick={() => sethidePassword(false)} /> : <AiFillEye onClick={() => sethidePassword(true)} size={25} />}
          </div>

          {errorMsg && <p className=" text-red-500">{errorMsg}</p>}
          <div className="flex flex-col mt-2 ">
            <div className="mb-1 p-1 items-center justify-center font-semibold flex rounded bg-black text-white text-xl cursor-pointer  hover:bg-slate-600" onClick={handleLogin}>Login</div>
            <Link href={"/SignUp"}>
              <div onClick={()=>setIsLoaderCalled(true)} className="p-1 flex rounded bg-black font-semibold text-white text-xl cursor-pointer hover:bg-slate-600">Create Account?</div>
            </Link>
          </div>
        </div>
      </div>
}
       
</>
}
</>
  );
}

export default Login;
