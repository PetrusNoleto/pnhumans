"use client"
import AuthenticatedComponent from "@/components/authenticated";
import {useEffect, useState} from "react";
import CreateHumanModal from "@/components/modals/createHumanModals";
import axios from "axios";
import {getAuthCookie} from "@/utils/getAuthCookie";
import {humanDatabaseProps} from "@/types/requesthuman";
import HumansLIstContainer from "@/components/humans/humansLIstContainer";
import HumansList from "@/components/humans/humanslist";
import {logout} from "@/utils/logoult";
import {getPnHumansApiAddress} from "@/utils/getVariables";


export default function Humans(){
    const [humanList,setHumanList] = useState<humanDatabaseProps[] | []>([])
    const [openLateralMenu,setOpenLateralMenu] = useState(false)
    const [openNewHumanModal,setOpenNewHumanModal] = useState(false)

    const getHumans = async ()=>{
        const getCookie = await getAuthCookie()
        const apiAddress = await getPnHumansApiAddress()
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getCookie
        };
        const humans = await axios.post(`${apiAddress}/humans/`,{},{headers})
        const data = await humans.data
        setHumanList(data)
    }

    useEffect(() => {
        document.title = "humanos - pnhumans"
        getHumans()
    }, [humanList]);

    return(
        <AuthenticatedComponent>
            {openNewHumanModal ?
                <CreateHumanModal closePanel={()=>{
                    setOpenNewHumanModal(false)
                }}/>
                :
                <></>
            }
            <header className={'relative p-3 flex justify-between p-3w-full h-[50px]'}>
                <div className={'flex gap-3 items-center'}>
                    <h1 className={'font-medium text-xl'}>pnhumans</h1>
                </div>
                <div>
                    <button className={''} onClick={()=>{
                        logout()
                    }}>
                        sair
                    </button>
                </div>
            </header>
            <main className={"w-full h-full"}>
                <div className={'flex justify-between items-center gap-3 px-12 py-6'}>
                    <span>humanos</span>
                    <button className={'border p-3 rounded-lg bg-blue-700 text-xs font-bold text-white lg:p-2'} onClick={()=>{
                        setOpenNewHumanModal(true)
                    }}>adicionar humano</button>
                </div>
                {humanList.length >= 1  ?
                    <>
                        <HumansLIstContainer>
                            <HumansList array = {humanList}/>
                        </HumansLIstContainer>
                    </>
                    :
                    <div className={"w-full h-auto p-12 flex flex-col gap-3 justify-center items-center"}>
                        não há humanos
                        <button className={'border p-3 rounded-lg bg-blue-700 text-xs font-bold text-white lg:p-2'} onClick={() => {
                            setOpenNewHumanModal(true)
                        }}>adicionar humano</button>
                    </div>
                }
            </main>
        </AuthenticatedComponent>
    )
}