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
                <>carregando</>
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