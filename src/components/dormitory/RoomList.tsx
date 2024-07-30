'use client'
import { observer } from 'mobx-react';
import dormitoryOnlyStore from '@/stores/dormitoryOnlyStore';
import { useRef } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { TfiRulerPencil } from "react-icons/tfi";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { MdBookmarkBorder, MdOutlineMeetingRoom } from "react-icons/md";
import { IoMdBookmark, IoIosFitness } from "react-icons/io";
import { BiChat, BiCctv, BiGitCompare, BiCloset } from "react-icons/bi";
import { FaFacebookSquare, FaWifi, FaSmoking, FaCarSide, FaMotorcycle, FaTable  } from "react-icons/fa";
import { PiPhoneCallFill, PiDogBold, PiGenderIntersex, PiPicnicTableBold, PiFan, PiTelevisionSimple } from "react-icons/pi";
import { FaLine, FaShower  } from "react-icons/fa6";
import { GiLift, GiSecurityGate, GiKeyCard, GiWashingMachine } from "react-icons/gi";
import { RiFingerprintFill, RiRestaurantLine, RiStore3Line } from "react-icons/ri";
import { GrUserPolice } from "react-icons/gr";
import { HiOutlineDocumentText, HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { LuAirVent } from "react-icons/lu";
import { TbFridge } from "react-icons/tb";
import { IoBed } from "react-icons/io5";
import { Button } from '@mui/material';

const RoomList = observer(() => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <>
            {dormitoryOnlyStore.data?.dormitory_type?.map((item, i) => (
                <section key={i} className='card shadow-md p-4 relative overflow-hidden'>
                    <span className="absolute w-80 h-80 bg-sky-400/10 dark:bg-sky-900/10 -top-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
                    <span className="absolute w-[35rem] h-72 bg-blue-300/[.05] dark:bg-blue-950/10 -top-10 -left-40 -rotate-[30deg] rounded-[2rem]"></span>
                    <h1 className='font-semibold text-lg mb-2 flex justify-between'>
                        {item.name}
                        <span className={`py-2 px-3 text-white rounded-md text-sm font-medium
                            ${item.occupied === item.quantity ? 'bg-red-400 dark:bg-red-500' : 'hidden'}`}>
                            {item.occupied === item.quantity ? 'ห้องพักเต็ม' : 'ว่าง'}
                        </span>
                    </h1>
                    <div className='flex flex-wrap'>
                        <div className='aspect-[16/9] md:h-64 md:aspect-[10/8] overflow-hidden rounded-lg'>
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 10 * 1000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={false}
                                modules={[Autoplay]}
                                onAutoplayTimeLeft={onAutoplayTimeLeft}
                            >
                                {item.dormitory_typeimg.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dormitoryTypeImages/${image.url}`}
                                            alt={image.url}
                                            width={1920}
                                            height={950}
                                            className='h-full w-full object-cover object-center'
                                            priority
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className='md:flex-1 w-full md:w-auto mt-4 md:mt-0 md:ms-4 border-items rounded-lg p-4 relative'>
                            <div className='flex-center py-2 gap-2 bg-slate-100 dark:bg-gray-800 w-52 rounded-md border border-blue-400 text-sm'>
                                <TfiRulerPencil className='text-blue-500 text-lg' />
                                กว้าง {item.width} ม. <span className='text-xs'>x</span> ยาว {item.length} ม.
                            </div>
                            <div className='mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 
                            xl:grid-cols-10 gap-4 pb-12'>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.fan ? '' : 'oopacity-50 grayscale'}`}>
                                    <PiFan className="text-xl text-blue-500"/> พัดลม
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.air ? '' : 'oopacity-50 grayscale'}`}>
                                    <LuAirVent className="text-xl text-blue-500"/> เครื่องปรับอากาศ
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.bed ? '' : 'oopacity-50 grayscale'}`}>
                                    <IoBed className="text-xl text-blue-500"/> เตียงนอน
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.dressing_table ? '' : 'oopacity-50 grayscale'}`}>
                                    <FaTable className="text-xl text-blue-500"/> โต๊ะเครื่องแป้ง
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.closet ? '' : 'oopacity-50 grayscale'}`}>
                                    <BiCloset className="text-xl text-blue-500"/> ตู้เสื้อผ้า
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.water_heater ? '' : 'oopacity-50 grayscale'}`}>
                                    <FaShower className="text-xl text-blue-500"/> น้ำอุ่น
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.fridge ? '' : 'oopacity-50 grayscale'}`}>
                                    <TbFridge className="text-xl text-blue-500"/> ตู้เย็น
                                </span>
                                <span className={`col-span-2 flex-y-center gap-4 text-sm
                                    ${item.dormitory_facilitate.tv ? '' : 'oopacity-50 grayscale'}`}>
                                    <PiTelevisionSimple className="text-xl text-blue-500"/> โทรศัพท์
                                </span>
                            </div>
                            <div className='absolute bottom-0 left-0 w-full flex md:flex-col justify-between items-end pb-2 px-4'>
                                <h1 className='text-blue-400 font-semibold text-xl'>
                                    <span className='text-sm me-1'>THB</span>{item.price}
                                </h1>
                                <Button variant="contained" className='text-white'>
                                    เลือกห้องพัก
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    )
})

export default RoomList;
