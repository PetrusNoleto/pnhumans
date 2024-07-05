'use client'
import Link from "next/link";
import GitHubIcon from "@/components/icons/githubIcon";
import GitLabIcon from "@/components/icons/gitlabIcon";
import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Page(){
    const [userName,setUserName] = useState('')
    const [userPassword,setUserPassword] = useState('')
    const [error,setError] = useState('')
    const submitForm = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const userData = {
            requestUserName:userName,
            requestUserPassword:userPassword
        }
        try {
            const requestLogin = await axios.post('http://192.168.100.10:3333/user/create/',userData)
            const data = await requestLogin.data
            console.log(data)
            if(data === "usuario já existe!"){
                setError('username taken')
            }
            if(data === "usuario criado com sucesso!"){
                location.replace('/auth/signin/')
            }
        }catch (error){
            console.log(error)
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
                            <h1 className={'capitalize text-2xl py-6 font-medium text-[#141414]'}>Sign Up</h1>
                            <p className={'first-letter:capitalize font-light text-gray-500'}>use your credentials for
                                sign up you account
                            </p>
                        </div>
                        <form className={'w-full lg:w-[480px] flex flex-col gap-3 py-4'} id={'signUpUserForm'} onSubmit={submitForm}>
                            <label className={'flex flex-col gap-2'}>
                                <span className={'text-center text-red-600 font-bold'}>{error}</span>
                                <h2 className={'first-letter:capitalize'}>
                                    username
                                </h2>
                                <input
                                    id={'userName'}
                                    name={'userName'}
                                    type={"text"}
                                    placeholder={'ex:grandmaster123'}
                                    className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-indigo-700 rounded-md transition-all duration-300'}
                                    value={userName}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserName(e.target.value)}}
                                />
                            </label>
                            <label className={'flex flex-col gap-2'}>
                                <h2 className={'first-letter:capitalize'}>
                                    password
                                </h2>
                                <input
                                    id={'userPassword'}
                                    name={'userPassword'}
                                    type={"password"}
                                    placeholder={'your password'}
                                    className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-indigo-700 rounded-md transition-all duration-300'}
                                    value={userPassword}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserPassword(e.target.value)}}
                                />
                            </label>
                            <button
                                type={'submit'}
                                form={'signUpUserForm'}
                                className={'w-full h-11 border rounded-md bg-indigo-600 text-white hover:bg-indigo-800 transition-all duration-300 font-bold text-sm'}
                            >
                                Sign Up
                            </button>
                        </form>
                        <span className={'uppercase'}><strong>or</strong></span>
                        <div className={'w-full lg:w-[480px] flex flex-col gap-3 py-4'}>
                            <button
                                className={'w-full h-11 border rounded-md flex items-center justify-center gap-3'}
                                onClick={() => {
                                    alert("em desenvolvimento")
                                }}
                            >
                                <div className={'w-full flex justify-center gap-3'}>
                                    <div className={'w-6 h-6'}>
                                        <GitHubIcon/>
                                    </div>
                                    <span>continue with github</span>
                                </div>
                            </button>
                            <button
                                className={'w-full h-11 border rounded-md flex items-center justify-center gap-3'}
                                onClick={() => {
                                    alert("em desenvolvimento")
                                }}
                            >
                                <div className={'flex justify-start gap-3'}>
                                    <div className={'w-6 h-6'}>
                                        <GitLabIcon/>
                                    </div>
                                    <span>continue with gitlab</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
                <section className={'hidden lg:block xl:w-1/2'}>

                </section>
            </main>
        </div>
    )
}