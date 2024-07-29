import Link from "next/link"
import axios from "axios"

// Material UI
import { Button } from "@mui/material"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// Components
import Carousel from "@/components/dormitory/Carousel"
import MenuHeader from "@/components/dormitory/MenuHeader";
import Overview from "@/components/dormitory/Overview";
import RoomList from "@/components/dormitory/RoomList";

// Icons
import { FaArrowUpWideShort } from "react-icons/fa6";

async function getData(id:string) {
    try {
        const result = await axios.get(`http://localhost:3000/api/getDormitory/${id}`);
        return result.data
    } catch (error) {
        console.log(error);
    }
}

async function page({ params }: { params: { id: string }}) {
    const data = await getData(params.id);
    console.log(data);
    if (data) {
        return (
            <div className='pt-16 md:pt-20 pb-10'>
                <div className="flex-center gap-2 h-9 bg-blue-400 text-white text-sm">
                    ลงทะเบียนเป็นสมาชิคกับเราได้ที่ <Link href="/register" className="font-bold cursor-pointer">สมัครสมาชิก</Link>
                </div>
                <div className="bg-base shadow-sm sticky top-0 z-[700]">
                    <MenuHeader data={data}/>
                </div>
                <div className="container pt-6 xl:px-16 z-10">
                    <Carousel/>
                    <Overview/>
                    <h1 className='text-xl font-semibold mt-6 mb-2'>ห้องว่างที่ให้ผู้เข้าพักจองที่เปิดให้บริการ</h1>
                    <RoomList/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex-center h-screen w-screen">
                ไม่พบบริการที่เลือก
            </div>
        )
    }
}

export default page