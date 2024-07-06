'use client'
import Link from "next/link";
import GitHubIcon from "@/components/icons/githubIcon";
import GitLabIcon from "@/components/icons/gitlabIcon";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {createAuthCookie} from "@/utils/createAuthCookie";


export default function SignIn(){
    const [userName,setUserName] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const [error,setError] = useState('')
    const submitForm = async (e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            setError("")
            const userData = {
                requestUserName:userName,
                requestUserPassword:userPassword
            }
            try {
                const requestLogin = await axios.post('http://192.168.100.10:3333/user/auth/',userData)
                const responseData = await requestLogin.data
                await createAuthCookie(responseData.token)
                location.replace("/dashboard/humans/")
            }catch (error){
                setError("not authenticated")
            }
    }
    useEffect(() => {
        document.title = "sign - pnhumans"
    }, []);
    return(
        <div className={'relative'}>
            <header className={'absolute w-screen h-16 flex items-center p-6'}>
                <span className={'text-2xl font-bold'}>pnHumans</span>
            </header>
            <main className={'flex  w-screen h-screen p-6'}>
               <section className={'w-full xl:w-1/2 h-full'}>
                   <div className={'w-full items-center p-3 py-16 flex flex-col gap-3'}>
                       <div className={'w-full lg:w-[480px] py-8 text-center'}>
                           <h1 className={'capitalize text-2xl py-6 font-medium text-[#141414]'}>login</h1>
                           <p className={'first-letter:capitalize font-light text-gray-500'}>use suas credenciais
                               para acessar sua conta</p>
                       </div>
                       <form className={'w-full lg:w-[480px] flex flex-col gap-3 py-4'} id={'signInUserForm'} onSubmit={submitForm}>
                           <label className={'flex flex-col gap-2'}>
                               <span className={'text-center font-bold text-red-600'}>{error}</span>
                               <h2 className={'first-letter:capitalize'}>
                                   usuario
                               </h2>
                               <input id={'userName'}
                                      name={'userName'}
                                      type={"text"}
                                      placeholder={'ex:grandmaster123'}
                                      className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-blue-700 rounded-md transition-all duration-300'}
                                      value={userName}
                                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserName(e.target.value)}}
                               />
                           </label>
                           <label className={'flex flex-col gap-2'}>
                               <h2 className={'first-letter:capitalize'}>
                                  senha
                               </h2>
                               <input
                                   id={'userPassword'}
                                   name={'userPassword'}
                                   type={"password"}
                                   placeholder={'digite sua senha'}
                                   className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-blue-700 rounded-md transition-all duration-300'}
                                   value={userPassword}
                                   onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserPassword(e.target.value)}}
                               />
                               <div className={'w-full flex justify-end text-indigo-700 text-sm'}>
                                   <Link href={''} className={'test-sm font-bold'}>esqueci minha senha</Link>
                               </div>
                           </label>
                           <button
                               type={'submit'}
                               form={'signInUserForm'}
                               className={'w-full h-11 border rounded-md bg-blue-600 text-white hover:bg-blue-800 transition-all duration-300 font-bold text-sm'}
                           >
                               login
                           </button>
                       </form>
                       <span className={'uppercase'}><strong>or</strong></span>
                       <div className={'w-full lg:w-[480px] flex flex-col gap-3 py-4'}>
                           <button
                               className={'group transition-all duration-300 hover:bg-black hover:text-white w-full h-11 border rounded-md flex items-center justify-center gap-3'}
                               onClick={() => {
                                   alert("em desenvolvimento")
                               }}
                           >
                               <div className={'w-full flex justify-center gap-3 '}>
                                   <div className={'w-6 h-6'}>
                                       <GitHubIcon otherStyles={'group-hover:fill-white transition-all duration-300'}/>
                                   </div>
                                   <span>login com github</span>
                               </div>
                           </button>
                           <button
                               className={'group transition-all duration-300 hover:bg-[#F33B01]  hover:text-white w-full h-11 border rounded-md flex items-center justify-center gap-3'}
                               onClick={() => {
                                   alert("em desenvolvimento")
                               }}
                           >
                               <div className={' flex justify-start gap-3'}>
                                   <div className={'w-6 h-6'}>
                                       <GitLabIcon otherStyles={'group-hover:fill-white transition-all duration-300'}/>
                                   </div>
                                   <span>login com gitlab</span>
                               </div>
                           </button>
                       </div>
                       <div>
                           <span className={'text-sm'}>não possui uma conta? <Link href={'/auth/signup/'} className={'font-bold text-indigo-800 '}>criar conta</Link></span>
                       </div>
                   </div>
               </section>
                <section className={'hidden lg:block xl:w-1/2'}>

                </section>
            </main>
        </div>
    )
}