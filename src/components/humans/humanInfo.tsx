import React from "react";

interface HumanInfoProps{
    title:string,
    value:string | number
}

const HumanInfo:React.FC<HumanInfoProps> = ({title,value})=>{
    return (
        <div className={'py-1'}>
            <span className={'font-bold capitalize'}>{title}</span> : <span>{value}</span>
        </div>
    )
}
export default HumanInfo