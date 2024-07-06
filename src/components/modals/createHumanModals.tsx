import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {requestHumanResults} from "@/types/requesthuman";
import {getAuthCookie} from "@/utils/getAuthCookie";

interface createHumanModalProps{
    closePanel:()=>void
}


const CreateHumanModal:React.FC<createHumanModalProps> = ({closePanel})=>{
    const [human,setHumansList] = useState<requestHumanResults | null>(null)
    const [loading,setLoading] = useState(false)
    const [saveSuccess,setSaveSuccess] = useState(false)
    const [saveError,setSaveError] = useState(false)
    const getGender = ()=>{
        if(human?.gender === "male"){
            return "masculino"
        }
        if(human?.gender === "female"){
            return "feminino"
        }
    }
    const saveHuman = async ()=>{
        const requestData = {
            requestName:human?.name.first,
            requestLastName:human?.name.last,
            requestGender:getGender(),
            requestAge:human?.dob.age,
            requestPhone:human?.phone,
            requestCell:human?.cell,
            requestEmail:human?.email,
            requestCountry:human?.location.country,
            requestState:human?.location.state,
            requestCity:human?.location.city,
            requestStreetName:human?.location.street.name,
            requestStreetNumber:human?.location.street.number.toString(),
            requestPostcode:human?.location.postcode,
            requestLatitude:human?.location.coordinates.latitude,
            requestLongitude:human?.location.coordinates.longitude,
            requestIdentification:human?.id.value,
            requestPicture:human?.picture.large,
            requestUserName:human?.login.username,
            requestPassword:human?.login.password,
        };
        const getCookie = await getAuthCookie()
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getCookie
        };
        const sendHuman = await axios.post('http://192.168.100.10:3333/human/create/',requestData,{headers})
        const data = await sendHuman.data
        if(data === "humano criado com sucesso"){
            //setSaveSuccess(true)
            setLoading(false)
            await getHuman()
        }else{
            //setSaveError(true)
            await getHuman()
            setLoading(false)
        }
    }


    const getHuman = async ()=>{
        const human = await axios.get('https://randomuser.me/api/?nat=br&password=upper,lower,number,8-24')
        return setHumansList(human.data.results[0])
    }
    const getCountry= ()=>{
        if(human?.location.country === "Brazil"){
            return "Brasil"
        }
    }
    useEffect(()=>{
        getHuman()
    },[])
    return(
        <>
            <div
                className={'w-screen h-screen fixed top-0 left-0  z-10 flex justify-center bg-black/50 items-center'}>
                <div
                    className={'relative w-full lg:w-[620px] h-full lg:h-[620px] bg-white rounded-lg shadow-lg border flex flex-col justify-between '}>
                    <div className={'w-full h-full overflow-y-auto p-3 py-20'}>
                    <div
                            className={'w-full fixed lg:absolute top-0 left-0 flex gap-3 p-3 justify-between items-center bg-white z-10 border-b'}>
                            <h2 className={'text-xs font-bold first-letter:capitalize'}>adicionar humano</h2>
                            <button className={'p-3 border rounded-lg text-white bg-blue-600 font-bold text-xs lg:p-2'} onClick={() => {
                                setLoading(false)
                                getHuman()
                            }}>
                                gerar novamente
                            </button>
                        </div>
                        <div className={'p-3'}>
                            <Image src={human?.picture.large as string} alt={''} width={128} height={128}
                                   className={'rounded-full p-3 border-2 shadow-lg'} priority={true} quality={100}/>
                        </div>
                        <div className={'p-3'}>
                            <h3 className={'text-2xl font-bold'}>
                                <strong>Informações</strong>

                            </h3>
                            <div className={'p-3 flex flex-col gap-3'}>
                                <span className={'font-bold'}>CPF: <span className={'font-normal'}>{human?.id.value} </span></span>
                                <span className={'font-bold'}>nome: <span className={'font-normal'}>{human?.name.first} </span></span>
                                <span className={'font-bold'}>sobrenome: <span className={'font-normal'}>{human?.name.last} </span></span>
                                <span className={'font-bold'}>genero: <span className={'font-normal'}>{getGender()}  </span></span>
                                <span className={'font-bold'}>idade: <span className={'font-normal'}>{human?.dob.age}</span></span>
                            </div>
                        </div>
                        <div className={'p-3'}>
                            <h3 className={'text-2xl font-bold'}>Endereço</h3>
                            <div className={'w-full p-3 flex flex-col gap-3'}>
                                <span className={'font-bold'}>pais: <span className={'font-normal'}>{getCountry()} </span></span>
                                <span className={'font-bold'}>estado: <span className={'font-normal'}>{human?.location.state} </span></span>
                                <span className={'font-bold'}>cidade: <span className={'font-normal'}>{human?.location.city}</span></span>
                                <span className={'font-bold'}>rua: <span className={'font-normal'}>{human?.location.street.name}</span></span>
                                <span className={'font-bold'}>numero: <span className={'font-normal'}>{human?.location.street.number}</span></span>
                                <span className={'font-bold'}>CEP: <span className={'font-normal'}>{human?.location.postcode}000</span></span>
                                <span className={'font-bold'}>coodernadas: <span className={'font-normal'}>x:{human?.location.coordinates.latitude} y:{human?.location.coordinates.longitude}</span></span>
                            </div>
                        </div>
                        <div className={'p-3'}>
                            <h3 className={'text-2xl font-bold'}>contato</h3>
                            <div className={'w-full p-3 flex flex-col gap-3'}>
                                <span className={'font-bold'}>email: <span className={'font-normal text-sm'}> {human?.email}</span></span>
                                <span className={'font-bold'}>telefone: <span className={'font-normal'}> {human?.phone}</span></span>
                                <span className={'font-bold'}>celular: <span className={'font-normal'}>{human?.cell}</span></span>
                            </div>
                        </div>
                        <div className={'p-3'}>
                            <h3 className={'text-2xl font-bold'}>credenciais</h3>
                            <div className={'w-full p-3 flex flex-col gap-3'}>
                                <span className={'font-bold'}>email: <span className={'font-normal text-sm'}> {human?.email}</span></span>
                                <span className={'font-bold'}>usuario: <span className={'font-normal'}> {human?.login.username}</span></span>
                                <span className={'font-bold'}>senha: <span className={'font-normal'}>{human?.login.password}</span></span>
                            </div>
                        </div>
                        <div
                            className={'w-full fixed lg:absolute right-0 bottom-0 flex gap-3 p-3 justify-end bg-white z-10 border-t'}>
                            <button className={'p-3 border rounded-lg bg-[#141414] text-white text-xs font-bold lg:p-2'}
                                    onClick={closePanel}>
                            voltar
                            </button>

                                        {loading ?
                                                <div
                                                    className={'p-3 border rounded-lg bg-blue-700 text-white text-xs font-bold lg:p-2 flex gap-3'}
                                                    
                                                >
                                                    escolher humano
                                                <div className={'w-4 h-4 border rounded-full animate-spin border-white'}>
                                                    <div className={'w-full h-full border animate-ping'}>

                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <button
                                                className={'p-3 border rounded-lg bg-blue-700 text-white text-xs font-bold lg:p-2 flex gap-3'}
                                                onClick={() => {
                                                    setLoading(true)
                                                    saveHuman()
                                                }}
                                            >
                                                escolher humano
                                            </button>
                                        }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CreateHumanModal