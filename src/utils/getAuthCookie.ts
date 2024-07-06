"use server"
import {cookies} from "next/headers";
export  const getAuthCookie = async ()=>{
    const authCookie = cookies()
    const getCookie = authCookie.get('pn2342humans234234user45345authenticated34893jwt')
    return getCookie?.value
}
