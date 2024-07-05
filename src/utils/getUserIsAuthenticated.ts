"use server"
import {cookies} from "next/headers";
export const getUserIsAuthenticated = async() =>{
    const appCookie = cookies()
    const getCookie = appCookie.get('pn2342humans234234user45345authenticated34893jwt')
    if(getCookie !== undefined){
        if(getCookie.value){
            return "authenticated"
        }else{
            return "notAuthenticated"
        }
    }else{
        return "not found"
    }
}
