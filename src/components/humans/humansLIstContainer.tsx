import React, {ReactNode} from "react";

interface  HumansLIstContainerProps{
    children:ReactNode
}


const HumansLIstContainer:React.FC<HumansLIstContainerProps>  = ({children})=>{
    return(
        <section className={'relative w-full border-t p-8 '}>
            {children}
        </section>
    )
}
export default HumansLIstContainer