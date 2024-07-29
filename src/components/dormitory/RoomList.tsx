'use client'
import { useRef } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type Props = {}

const RoomList = (props: Props) => {
    const progressCircle = useRef<SVGSVGElement>(null);
    const progressContent = useRef<HTMLSpanElement>(null);

    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', `${1 - progress}`);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };
    return (
        <section className='card shadow-md p-4'>
            <h1 className='font-semibold text-lg mb-2'>Superior Premier</h1>
            <div className='flex'>
                <div className='h-64 aspect-[10/8] overflow-hidden rounded-lg'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 10*1000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                    >
                        <SwiperSlide>
                            <Image
                                src={`/images/dormitory/1.png`}
                                alt="list DMT"
                                width={1920}
                                height={950}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={`/images/dormitory/2.jpg`}
                                alt="list DMT"
                                width={1920}
                                height={950}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={`/images/dormitory/3.jpg`}
                                alt="list DMT"
                                width={1920}
                                height={950}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={`/images/dormitory/4.jpg`}
                                alt="list DMT"
                                width={1920}
                                height={950}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src={`/images/dormitory/5.jpg`}
                                alt="list DMT"
                                width={1920}
                                height={950}
                                className='h-full w-full
                                object-cover object-center'
                                priority
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default RoomList