"use client"
import AuthenticatedComponent from "@/components/authenticated";
import {useState} from "react";
import MenuIcon from "@/components/icons/menuIcon";
import LateralMenu from "@/components/lateralmenu/lateralMenu";
import CreateHumanModal from "@/components/modals/createHumanModals";

export default function Humans(){
    const [humanList,setHumanList] = useState([])
    const [openLateralMenu,setOpenLateralMenu] = useState(false)
    const [openNewHumanModal,setOpenNewHumanModal] = useState(false)
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
                    <></>
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