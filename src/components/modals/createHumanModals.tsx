import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {requestHumanResults} from "@/types/requesthuman";


const CreateHumanModal = ()=>{
    const [humansList,setHumansList] = useState<requestHumanResults | null>(null)
    const getHuman = async ()=>{
        const human = await axios.get('https://randomuser.me/api/')
        console.log(await human.data.results[0])
        return setHumansList(human.data.results[0])
    }

    useEffect(()=>{
        getHuman()
    },[])
    return(
        <div className={'w-screen h-screen absolute top-0 left-0  z-10 flex justify-center bg-black/50 items-center'}>
            <div className={'relative w-full lg:w-[420px] h-full lg:h-[620px] bg-white rounded-lg shadow-lg border flex flex-col justify-between'}>
                <div className={'h-full overflow-y-auto p-3 py-20'}>
                    <div
                        className={'w-full absolute top-0 left-0 flex gap-3 p-3 justify-between items-center bg-white z-10 border-b'}>
                        <h2>create human</h2>
                        <button className={'p-2 border'} onClick={() => {
                            getHuman()
                        }}>
                            create another
                        </button>
                    </div>
                    <div className={'p-3'}>
                        <Image src={humansList?.picture.large as string} alt={''} width={128} height={128}
                               className={'rounded-full p-3 border-2 shadow-lg'} priority={true} quality={100}/>
                    </div>
                    <div className={'p-3'}>
                        <h3>Identification</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span>type : {humansList?.id.name}</span>
                            <span>value : {humansList?.id.value}</span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3>Information</h3>
                        <div className={'p-3 flex flex-col gap-3'}>
                            <span>first name : {humansList?.name.first}</span>
                            <span>last name : {humansList?.name.last}</span>
                            <span>gender : {humansList?.gender}</span>
                            <span>age : {humansList?.dob.age}</span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3>Localization</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span>country : {humansList?.location.country}</span>
                            <span>state : {humansList?.location.state}</span>
                            <span>city : {humansList?.location.city}</span>
                            <span>street : {humansList?.location.street.name} {humansList?.location.street.number}</span>
                            <span>coordinates : x:{humansList?.location.coordinates.latitude} y:{humansList?.location.coordinates.longitude}</span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3>Contact</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span>email : {humansList?.email}</span>
                            <span>phone : {humansList?.phone}</span>
                            <span>cell : {humansList?.cell}</span>
                        </div>
                    </div>
                    <div className={'p-3'}>
                        <h3>Login</h3>
                        <div className={'w-full p-3 flex flex-col gap-3'}>
                            <span>username : {humansList?.login.username}</span>
                            <span>password : {humansList?.login.password}</span>
                        </div>
                    </div>
                    <div
                        className={'w-full absolute right-0 bottom-0 flex gap-3 p-3 justify-end bg-white z-10 border-t'}>
                        <button className={'p-3 border'} onClick={() => {
                            location.reload()
                        }}>
                            cancel
                        </button>
                        <button className={'p-3 border'}>
                            save
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default CreateHumanModal