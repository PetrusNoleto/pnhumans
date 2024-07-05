"use server"
import {cookies} from "next/headers";
export const createAuthCookie = async(cookieData:string) =>{
    const appCookie = cookies()
    const setCookie = appCookie.set('pn2342humans234234user45345authenticated34893jwt',"auth")
}
