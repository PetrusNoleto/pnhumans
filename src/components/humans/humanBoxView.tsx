import React from "react";
import {humanDatabaseProps} from "@/types/requesthuman";
import Image from "next/image";
import HumanInfo from "@/components/humans/humanInfo";

interface  HumanBoxViewProps{
    humanObject:humanDatabaseProps
    closePanel?:()=>void
    deleteHuman?:()=>void
}
const HumanBoxView:React.FC<HumanBoxViewProps> = ({humanObject,closePanel,deleteHuman})=>{
    return(
        <div className={'fixed top-0 left-0 w-screen h-screen  bg-black/50 border z-50 shadow-lg flex justify-center items-center  rounded-lg overflow-hidden '}>
            <div className={'relative w-full h-full lg:w-[480px] lg:h-[780px] bg-white  rounded-lg p-6'}>
                <div className={'py-3 border rounded-full w-[280px] h-[280px] flex justify-center items-center'} >
                    <Image src={humanObject.picture} alt={''} width={240} height={240} className={'rounded-full'} quality={100} priority={true}/>
                </div>
                <div className={'px-8 pt-8'}>
                    <div className={'flex gap-3'}>
                        <h6 className={'text-4xl font-bold'}>{humanObject.name} {humanObject.lastName}</h6>
                    </div>
                    <div>
                        <HumanInfo title={'email'} value={humanObject.email}/>
                        <HumanInfo title={'telefone'} value={humanObject.phone}/>
                        <HumanInfo title={'celular'} value={humanObject.cell}/>
                        <HumanInfo title={'usuario'} value={humanObject.username}/>
                        <HumanInfo title={'senha'} value={humanObject.password}/>
                        <HumanInfo title={'endereço'} value={`${humanObject.country} - ${humanObject.state} - ${humanObject.city}`}/>
                        <HumanInfo title={'CEP'} value={humanObject.postCode}/>
                        <HumanInfo title={'rua'} value={`${humanObject.streetName} - ${humanObject.streetNumber}`}/>
                    </div>


                </div>
                <div className={'absolute flex gap-3 w-full justify-between bottom-3 right-0 px-8'}>
                    <div className={'flex gap-1'}>
                        <button onClick={deleteHuman} className={'p-2 bg-red-600 text-white font-bold text-xs rounded-lg'}>
                            deletar humano
                        </button>
                    </div>

                    <button onClick={closePanel} className={'p-2 bg-blue-600 text-white font-bold text-xs rounded-lg'}>fechar painel</button>
                </div>

            </div>


        </div>
    )
}
export default HumanBoxView