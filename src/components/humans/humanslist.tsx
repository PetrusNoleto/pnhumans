'use client'
import {humanDatabaseProps} from "@/types/requesthuman";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import HumanBoxView from "@/components/humans/humanBoxView";
interface  humanListProps{
    array:humanDatabaseProps[]
}


const HumansList:React.FC<humanListProps> = ({array})=>{
    const humanList = array
    const [viewHuman,setViewHuman] = useState(false)
    const [uniqueHuman,setUniqueHuman]=useState<humanDatabaseProps | undefined>(undefined)

    return(
        <ul className={'relative flex gap-3 flex-col  w-full lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:w-full'}>
            {viewHuman && uniqueHuman !== undefined?
                <HumanBoxView humanObject={uniqueHuman} closePanel={()=>{
                    setViewHuman(false)
                }}/>
                :
                <></>

            }
            {humanList.map(human=>{
                return(
                    <li key={human.id}>
                        <button className={'w-full lg:w-[360px] h-[75px] border rounded-lg p-3 items-center'} onClick={()=>{
                            const find = humanList.find((humans:humanDatabaseProps)=>{return humans.id === human.id})
                            setUniqueHuman(find)
                            setViewHuman(true)
                        }}>
                            <div className={'flex items-center'}>
                               <div className={'flex items-center gap-3'}>
                                   <div className={'relative w-12 h-12'}>
                                       <Image src={human.picture} alt={`image de ${human.name}`} fill={true} className={'rounded-full'}/>
                                   </div>
                                   <div className={'flex gap-1'}>
                                       <h4>{human.name}</h4>
                                       <h4>{human.lastName}</h4>
                                   </div>
                               </div>
                            </div>
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
export default HumansList