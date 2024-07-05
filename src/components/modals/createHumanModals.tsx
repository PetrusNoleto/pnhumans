import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {requestHumanResults} from "@/types/requesthuman";


const CreateHumanModal = ()=>{
    const [humansList,setHumansList] = useState<requestHumanResults | null>(null)
    const [loading,setLoading] = useState(false)
    const [saveSuccess,setSaveSuccess] = useState(false)
    const [saveError,setSaveError] = useState(false)
    const getHuman = async ()=>{
        const human = await axios.get('https://randomuser.me/api/?nat=br&password=upper,lower,number,8-24')
        console.log(await human.data.results[0])
        return setHumansList(human.data.results[0])
    }
    const getGender = ()=>{
        if(humansList?.gender === "male"){
            return "masulino"
        }
        if(humansList?.gender === "female"){
            return "feminino"
        }
    }
    const getCountry= ()=>{
        if(humansList?.location.country === "Brazil"){
            return "Brasil"
        }
    }
    if(saveError){
        return (
            <div className={'absolute w-screen h-screen bg-red-600 flex flex-col justify-center items-center z-30 gap-3'}>
                <span className={
                    'text-xl text-white font-bold'
                }>error ao salvar humano</span>
                <button className={'p-3 bg-white rounded-lg font-bold'}>aperte para voltar</button>
            </div>
        )
    }
    if(saveSuccess){
        return (
            <div className={'absolute w-screen h-screen bg-green-600 flex flex-col justify-center items-center z-30 gap-3'}>
                <span className={
                    'text-xl text-white font-bold'
                }>humano salvo com sucesso</span>
                <button className={'p-3 bg-white rounded-lg font-bold'}>aperte para voltar</button>
            </div>
        )
    }

    useEffect(()=>{
        getHuman()
    },[])
    return(
        <div className={'w-screen h-screen absolute top-0 left-0  z-10 flex justify-center bg-black/50 items-center'}>
            <div className={'relative w-full lg:w-[620px] h-full lg:h-[620px] bg-white rounded-lg shadow-lg border flex flex-col justify-between'}>
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
                        <Image src={humansList?.picture.large as string} alt={''} width={128} height={128}
                               className={'rounded-full p-3 border-2 shadow-lg'} priority={true} quality={100}/>
                    </div>
                    <div className={'p-3'}>
                        <h3 className={'text-2xl font-bold'}>
                            <strong>Informações</strong>

                        </h3>
                        <div className={'p-3 flex flex-col gap-3'}>
                            <span className={'font-bold'}>CPF: <span className={'font-normal'}>{humansList?.id.value} </span></span>
                            <span className={'font-bold'}>nome: <span className={'font-normal'}>{humansList?.name.first} </span></span>
                            <span className={'font-bold'}>sobrenome: <span className={'font-normal'}>{humansList?.name.last} </span></span>
                            <span className={'font-bold'}>genero: <span className={'font-normal'}>{getGender()}  </span></span>
                            <span className={'font-bold'}>idade: <span className={'font-normal'}>{humansList?.dob.age}</span></span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3 className={'text-2xl font-bold'}>Endereço</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span className={'font-bold'}>pais: <span className={'font-normal'}>{getCountry()} </span></span>
                            <span className={'font-bold'}>estado: <span className={'font-normal'}>{humansList?.location.state} </span></span>
                            <span className={'font-bold'}>cidade: <span className={'font-normal'}>{humansList?.location.city}</span></span>
                            <span className={'font-bold'}>rua: <span className={'font-normal'}>{humansList?.location.street.name}</span></span>
                            <span className={'font-bold'}>numero: <span className={'font-normal'}>{humansList?.location.street.number}</span></span>
                            <span className={'font-bold'}>CEP: <span className={'font-normal'}>{humansList?.location.postcode}000</span></span>
                            <span className={'font-bold'}>coodernadas: <span className={'font-normal'}>x:{humansList?.location.coordinates.latitude} y:{humansList?.location.coordinates.longitude}</span></span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3 className={'text-2xl font-bold'}>contato</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span className={'font-bold'}>email: <span className={'font-normal text-sm'}> {humansList?.email}</span></span>
                            <span className={'font-bold'}>telefone: <span className={'font-normal'}> {humansList?.phone}</span></span>
                            <span className={'font-bold'}>celular: <span className={'font-normal'}>{humansList?.cell}</span></span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3 className={'text-2xl font-bold'}>credenciais</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span className={'font-bold'}>email: <span className={'font-normal text-sm'}> {humansList?.email}</span></span>
                            <span className={'font-bold'}>usuario: <span className={'font-normal'}> {humansList?.login.username}</span></span>
                            <span className={'font-bold'}>senha: <span className={'font-normal'}>{humansList?.login.password}</span></span>
                        </div>
                    </div>
                    <div
                        className={'w-full fixed lg:absolute right-0 bottom-0 flex gap-3 p-3 justify-end bg-white z-10 border-t'}>
                        <button className={'p-3 border rounded-lg bg-[#141414] text-white text-xs font-bold lg:p-2'}
                                onClick={() => {
                                    location.reload()
                                }}>
                        cancelar
                        </button>

                                <button
                                    className={'p-3 border rounded-lg bg-blue-700 text-white text-xs font-bold lg:p-2 flex gap-3'}
                                    onClick={() => {
                                        setLoading(true)
                                    }}
                                >
                                    escolher humano
                                    {loading ?
                                        <div className={'w-4 h-4 border rounded-full animate-spin border-white'}>
                                            <div className={'w-full h-full border animate-ping'}>

                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CreateHumanModal