"use client"
import AuthenticatedComponent from "@/components/authenticated";
import {useEffect, useState} from "react";
import MenuIcon from "@/components/icons/menuIcon";
import LateralMenu from "@/components/lateralmenu/lateralMenu";
import CreateHumanModal from "@/components/modals/createHumanModals";
import axios from "axios";
import {getAuthCookie} from "@/utils/getAuthCookie";
import {humanDatabaseProps} from "@/types/requesthuman";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";

export default function Humans(){
    const [humanList,setHumanList] = useState<humanDatabaseProps[] | []>([])
    const [openLateralMenu,setOpenLateralMenu] = useState(false)
    const [openNewHumanModal,setOpenNewHumanModal] = useState(false)

    const getHumans = async ()=>{
        const getCookie = await getAuthCookie()
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getCookie
        };

        const humans = await axios.post('http://192.168.100.10:3333/humans/',{},{headers})
        const data = await humans.data
        setHumanList(data)
    }

    useEffect(() => {
        getHumans()
    }, []);

    return(
        <AuthenticatedComponent>
            {openNewHumanModal ?
                <CreateHumanModal/>
                :
                <></>
            }
            <header className={'relative p-3 flex justify-between p-3w-full h-[50px]'}>
                {openLateralMenu  ?
                    <LateralMenu/>
                    :
                    <></>
                }
                <div className={'flex gap-3 items-center'}>
                    <button className={'relative w-6 h-6'} onClick={()=>{
                        if(openLateralMenu) {
                            setOpenLateralMenu(false)
                        }else {
                            setOpenLateralMenu(true)
                        }
                    }}>
                        <MenuIcon/>
                    </button>
                    <h1 className={'font-medium text-xl'}>pnhumans</h1>
                </div>
                <div>
                    <button className={'w-8 h-8 flex border-2 rounded-full'}>

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
                    <>{humanList.map(human=> {
                        return <h1>{human.name}</h1>
                    })}</>
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