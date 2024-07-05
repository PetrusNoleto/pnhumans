'use client'
import Link from "next/link";
import GitHubIcon from "@/components/icons/githubIcon";
import GitLabIcon from "@/components/icons/gitlabIcon";

export default function SignIn(){
    return(
        <div className={'relative'}>
            <header className={'absolute w-screen h-16 flex items-center p-6'}>
                <span className={'text-2xl font-bold'}>pnhumas</span>
            </header>
            <main className={'flex  w-screen h-screen p-6'}>
               <section className={'w-full xl:w-1/2 h-full'}>
                   <div className={'w-full items-center p-3 py-16 flex flex-col gap-3'}>
                       <div className={'w-full lg:w-[480px] py-8 text-center'}>
                           <h1 className={'capitalize text-2xl py-6 font-medium text-[#141414]'}>Sign In</h1>
                           <p className={'first-letter:capitalize font-light text-gray-500'}>use your credentials for
                               sign in you account</p>
                       </div>
                       <form className={'w-full lg:w-[480px] flex flex-col gap-3 py-4'} id={'signInUserForm'}>
                           <label className={'flex flex-col gap-2'}>
                               <h2 className={'first-letter:capitalize'}>
                                   username
                               </h2>
                               <input id={'userName'}
                                      name={'userName'}
                                      type={"text"}
                                      placeholder={'ex:grandmaster123'}
                                      className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-indigo-700 rounded-md transition-all duration-300'}
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
                                   className={'text-xs outline-none border-2 border-gray-500 w-full h-11 p-3 focus:border-indigo-700 rounded-md transition-all duration-300'}/>
                               <div className={'w-full flex justify-end text-indigo-700 text-sm'}>
                                   <Link href={''}>forgot password</Link>
                               </div>
                           </label>
                           <button
                               type={'submit'}
                               form={'signInUserForm'}
                               className={'w-full h-11 border rounded-md bg-indigo-600 text-white hover:bg-indigo-800 transition-all duration-300 font-bold text-sm'}
                           >
                               Sign In
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
                       <p className={''}>you dont have account yet?
                           <Link href={''} className={'text-indigo-700 font-bold'}>Sign up</Link>
                       </p>
                   </div>
               </section>
                <section className={'hidden lg:block xl:w-1/2'}>

                </section>
            </main>
        </div>
    )
}