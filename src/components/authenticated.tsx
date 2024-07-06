"use client"
import React, {ReactNode, useEffect, useState} from "react";
import {getUserIsAuthenticated} from "@/utils/getUserIsAuthenticated";

interface authenticatedComponentProps{
    children:ReactNode
}
const AuthenticatedComponent:React.FC<authenticatedComponentProps> =({children})=>{
    const [userIsAuthenticated, setUserAuthenticated]= useState<boolean | undefined>(undefined)
    useEffect(()=>{
        getUserIsAuthenticated()
            .then((response)=>{
                switch (response){
                    case "authenticated":
                        setUserAuthenticated(true)
                        break
                    case "notAuthenticated":
                        setUserAuthenticated(false)
                        break
                    case "not found":
                        location.replace('/auth/signin/')
                        break
                }
            })
    })
    return(
        <div>
            {userIsAuthenticated === undefined ?
                <div className={'w-screen h-screen flex justify-center items-center'}>
                    <div className={'flex justify-center items-center rounded-full w-32 h-32 border-2 border-red-600 animate-spin '}>
                        <div className={'flex justify-center items-center rounded-full w-31 h-31 border-2 border-blue-700 animate-spin'}>
                            <div className={'flex justify-center items-center rounded-full  w-32 h-32 border-3 border-red-600 animate-ping shadow-2xl'}>
                                <div className={'flex justify-center items-center rounded-full  w-32 h-32 border-2 border-blue-600 animate-pulse'}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                {userIsAuthenticated ?
                        <>{children}</>
                        :
                        <>voce não esta authenticado</>
                    }
                </>
            }
        </div>
    )
}
export default AuthenticatedComponent