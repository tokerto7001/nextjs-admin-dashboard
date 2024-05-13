import Link from "next/link";

export default function Menubar(){
    return (
        <div className="h-screen w-64 bg-[#13274F] text-white flex flex-col pt-36">
            <Link href='/register'>
                <div className="h-16 bg-blue-900 flex px-4 items-center border border-black">
                    Hasan
                </div>
            </Link>
            <Link href='/register'>
                <div className="h-16 bg-blue-900 flex px-4 items-center border border-black">
                    Hasan
                </div>
            </Link>
            <Link href='/register'>
                <div className="h-16 bg-blue-900 flex px-4 items-center border border-black">
                    Hasan
                </div>
            </Link>
        </div>
    )
}