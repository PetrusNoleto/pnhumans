"use server"

import * as dotenv from "dotenv";
dotenv.config();

export async function getPnHumansApiAddress (){
    const apiAddress = process.env.PN_HUMANS_API_ADDRESS as string
    if(apiAddress !== undefined){
        return apiAddress
    }else{
        return "variavel não declarada"
    }
}


export async function getRandoHumanApiAddress (){
    const apiAddress = process.env.RANDON_HUMANS_API_ADDRESS as string
    if(apiAddress !== undefined){
        return apiAddress
    }else{
        return "variavel não declarada"
    }
}



