import Link from "next/link";

const LateralMenu = ()=>{
    return(
        <nav className={'absolute top-0 left-0 w-full h-screen bg-white lg:w-[320px] lg:border-r-2 p-20 flex flex-col gap-3'}>
            <Link href={''} className={'p-3 border'}>humans</Link>
            <Link href={''} className={'p-3 border'}>settings</Link>
            <Link href={''} className={'p-3 border'}>logout</Link>
        </nav>
    )
}
export default LateralMenu