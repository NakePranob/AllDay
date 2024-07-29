'use client'
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { observer } from "mobx-react";
import dormitoryOnlyStore from "@/stores/dormitoryOnlyStore";

// Material UI
import { Button } from "@mui/material"

// Components
import Starscore from "@/components/Starscore"
import TextStateReview from "../TextStateReview";

// Icons
import { FaDoorOpen, FaStar } from "react-icons/fa";
import { FaBuildingShield } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";

import { MdBookmarkBorder, MdOutlineMeetingRoom } from "react-icons/md";
import { IoMdBookmark, IoIosFitness } from "react-icons/io";
import { BiChat, BiCctv, BiGitCompare } from "react-icons/bi";
import { FaFacebookSquare, FaWifi, FaSmoking, FaCarSide, FaMotorcycle } from "react-icons/fa";
import { PiPhoneCallFill, PiDogBold, PiGenderIntersex, PiPicnicTableBold } from "react-icons/pi";
import { FaLine } from "react-icons/fa6";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine, RiStore3Line } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { HiOutlineDocumentText, HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { LuAirVent } from "react-icons/lu";
import { TbFridge } from "react-icons/tb";

const Overview = observer(() => {
    function hasTypeRoom(data: any[], has: string): boolean {
        return data?.some(dormitory => dormitory.dormitory_facilitate[has]);
    }
    return (
        <section className="card overflow-hidden shadow-md p-4 pt-6 relative">
            <div className="flex sm:items-center flex-col sm:flex-row justify-between">
                <div className="max-w-[60%] sm:max-w-[50%] md:max-w-[60%]">
                    <h1 className="text-2xl font-semibold -mb-1 overflow-hidden
                    text-ellipsis whitespace-nowrap">
                        {dormitoryOnlyStore.data?.name}
                    </h1>
                    <p className="opacity-70">{dormitoryOnlyStore.data?.engname}</p>
                </div>
                <div className="flex-y-center justify-end w-full sm:w-auto gap-4 relative mt-1">
                    <div className="flex flex-col items-center sm:items-end gap-x-2">
                        <span className="text-xs opacity-70 hidden sm:block">ราคา/ห้องพัก/เดือน เริ่มต้นที่</span>
                        <h1 className="text-xl font-bold text-rose-500">THB {dormitoryOnlyStore.data?.price}</h1>
                    </div>
                    <Button variant="contained" className="text-white rounded-lg h-10
                     absolute sm:static right-0 bottom-10">
                        เลือกห้องพัก
                    </Button>
                </div>
            </div>
            <div className='flex-y-center gap-2 mt-2 text-yellow-300 absolute sm:static left-4 top-[4.5rem]'>
                <span className='flex-center w-20 rounded-full gap-2 py-1
                bg-blue-200/50 dark:bg-blue-900/30 text-xs text-blue-500'>
                    <FaDoorOpen/> {dormitoryOnlyStore.data?.dormitory_state?.home ? 'บ้านพัก' : 'ห้องพัก'}
                </span>
                <Starscore score={dormitoryOnlyStore.data?.reviewScore}/>
            </div>
            <div className="h-10 bg-sky-100 dark:bg-sky-900/30 mt-6 rounded-full flex-y-center">
                <span className="h-10 w-10 ms-1 rounded-full scale-125 bg-gradient flex-center shadow-lg">
                    <FaBuildingShield className="text-white opacity-80"/>
                </span>
                <p className="text-sm ms-4 opacity-80">เลือกที่พักที่ตรงใจคุณ และคุมค่าที่สุด</p>
            </div>
            <div className="mt-8 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6 lg:col-span-4 h-auto md:h-96 border-items rounded-xl relative 
                overflow-hidden overflow-y-auto scrollreg p-4 
                bg-rv-gradient dark:bg-rv-gradient-dark bg-contain bg-no-repeat bg-center-top">
                    <div className="flex-y-center gap-4 z-40">
                        <div className="flex-center w-14 h-14 rounded-lg relative
                        border-2 border-blue-300 bg-base backdrop-blur-sm">
                            <h1 className="text-2xl font-bold text-blue-500">{dormitoryOnlyStore.data?.reviewScore}</h1>
                            <span className="text-xs absolute -top-2 -left-1 bg-base px-1 text-blue-400">คะแนน</span>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-semibold">
                                <TextStateReview score={dormitoryOnlyStore.data?.reviewScore} countReview={dormitoryOnlyStore.data?.review?.length}/>
                            </h1>
                            <button className="text-sm font-semibold text-blue-400 text-left">
                                จากบทรีวิวจำนวน {dormitoryOnlyStore.data?.review?.length} รายการของผู้เช่าที่ได้รับการยืนยัน
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                    {dormitoryOnlyStore.data?.review && dormitoryOnlyStore.data?.review.length > 0 ? (
                        dormitoryOnlyStore.data?.review.slice(0, 4).map((item, i) => (
                            <section key={i} className="border-items rounded-lg p-2 pt-1 z-50 backdrop-blur-sm">
                                <div className="flex justify-between items-center text-sm">
                                    <p className="font-bold">{item.user?.firstname} {item.user?.lastname}</p>
                                    <div className="flex-center rounded-full gap-1 text-xs font-bold text-blue-500">
                                        <FaStar />
                                        <p className="pt-1">{item.score}</p>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm opacity-80">
                                    ห้องเหมือนในรูป พนง.บริการดี ราคาไม่แพง สะอาด ชอบค่ะ
                                </p>
                            </section>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 lg:col-span-4 rounded-xl border-items p-4 h-auto md:h-96
                flex flex-col overflow-y-auto scrollreg
                bg-map-gradient dark:bg-map-gradient-dark bg-contain bg-no-repeat bg-center-top">
                    <div className="flex-y-center justify-between">
                        <h1 className="text-xl font-medium">ที่ตั้งหอพัก</h1>
                        <Link href={dormitoryOnlyStore.data.location ? dormitoryOnlyStore.data.location : '#'} className="flex-y-center gap-1 hover:gap-2 text-blue-500 font-bold
                        hover:text-blue-700 dark:hover:text-blue-400 transition-all transition-300">
                            <p>ดูแผนที่</p>
                            <IoIosArrowForward/>
                        </Link>
                    </div>
                    <Link href={'/'} className="flex-y-center mt-4 gap-4 text-2xl 
                    hover:text-blue-400 transition-300">
                        <HiLocationMarker className="min-w-6"/>
                        <p className="text-sm">
                            {dormitoryOnlyStore.data?.address}
                        </p>
                    </Link>
                    <h1 className="mt-4 font-medium text-xs rounded-full pt-1 w-24 bg-blue-400 flex-center text-white">
                        ใกล้กับสถานที่
                    </h1>
                    <ul className="flex-1 px-4 pt-4 pb-0 flex flex-col gap-3">
                        {dormitoryOnlyStore.data?.location_distance && dormitoryOnlyStore.data?.location_distance.length > 0 ? (
                            dormitoryOnlyStore.data?.location_distance.map((item, i) => (
                                <li key={i} className="flex-y-center justify-between text-sm ">
                                    <p className="flex-y-center gap-2">
                                        <HiLocationMarker className="min-w-4"/>
                                        {item.location}
                                    </p>
                                    <p className="text-xs">
                                        {item.distance} กม.
                                    </p>
                                </li>
                            ))
                        ):(
                            <p>No reviews available.</p>
                        )}
                    </ul>
                </div>
                <div className="col-span-12 lg:col-span-4 rounded-xl border-items h-auto lg:h-96 p-4">
                    <div className="flex-y-center justify-between">
                        <h1 className="text-xl font-medium">สิ่งอำนวยความสะดวก</h1>
                        <Link href={'/'} className="flex-y-center gap-1 hover:gap-2 text-blue-500 font-bold
                        hover:text-blue-700 dark:hover:text-blue-400 transition-all transition-300">
                            <p>ดูรายละเอียด</p>
                            <IoIosArrowForward/>
                        </Link>
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-6 mt-6 px-2">
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!hasTypeRoom(dormitoryOnlyStore.data.dormitory_type, 'air') && 'hidden'}`}>
                            <LuAirVent className="text-xl text-blue-500"/> เครื่องปรับอากาศ
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.wifi && 'hidden'}`}>
                            <FaWifi className="text-xl text-blue-500"/> ฟรี Wi-Fi
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.cctv && 'hidden'}`}>
                            <BiCctv className="text-xl text-blue-500"/> กล้องวงจรปิด
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                             ${!hasTypeRoom(dormitoryOnlyStore.data.dormitory_type, 'table') && 'hidden'}`}>
                            <PiPicnicTableBold className="text-xl text-blue-500"/> โต๊ะทำงาน
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.restaurant && 'hidden'}`}>
                            <RiRestaurantLine className="text-xl text-blue-500"/> ร้านอาหาร
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.store && 'hidden'}`}>
                            <RiStore3Line className="text-xl text-blue-500"/> ร้านสะดวกซื้อ
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.washing && 'hidden'}`}>
                            <GiWashingMachine className="text-xl text-blue-500"/> มีเครื่องซักผ้า
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                             ${!hasTypeRoom(dormitoryOnlyStore.data.dormitory_type, 'fridge') && 'hidden'}`}>
                            <TbFridge className="text-xl text-blue-500"/> ตู้เย็น
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.park_car && 'hidden'}`}>
                            <FaCarSide className="text-xl text-blue-500"/> ลานจอดรถยนต์
                        </li>
                        <li className={`col-span-1 flex-y-center gap-4 text-sm
                            ${!dormitoryOnlyStore.data.dormitory_state?.park_motorcycle && 'hidden'}`}>
                            <FaMotorcycle className="text-xl text-blue-500"/> ลานจอดรถมอไซค์
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
})

export default Overview