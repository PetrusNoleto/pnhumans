'use server'
import {cookies} from "next/headers";
export const logout = async ()=>{
    const authCookie = cookies()
    const deleteCookie= authCookie.delete('pn2342humans234234user45345authenticated34893jwt')
}