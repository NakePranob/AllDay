'use client'
import { useState, useEffect, createRef } from "react";
import { observer } from "mobx-react"
import dormitoryOnlyStore from "@/stores/dormitoryOnlyStore"
import { useSession } from 'next-auth/react';

// material ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

// icons
import { BiSolidComment } from "react-icons/bi";    
import { FaStar } from "react-icons/fa";

// component
import Starscore from "@/components/Starscore"
import TextStateReview from "@/components/TextStateReview";

// function
import { CountPercent, StringDatetimeToDate } from "@/function/maths";

const Review = observer(() => {
    const { data: session, status } = useSession()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<number | null>(0);

    const reviewData = dormitoryOnlyStore.data?.review ?? [];
    const totalReviews = reviewData.length;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        dormitoryOnlyStore.targetReview = dormitoryOnlyStore.targetReview || createRef<HTMLElement>();
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="review-modal-title"
                aria-describedby="review-modal-description"
            >
                <Box className="card alert w-[95vw] sm:w-[26rem] p-4 rounded-lg" sx={style}>
                <Typography id="review-modal-title" variant="h6" component="h2">
                    คุณคิดยังไงกับหอพักนี้
                </Typography>
                <form onSubmit={(e)=>dormitoryOnlyStore.review(e,session?.user?.id)} noValidate autoComplete="off" className="mt-4">
                    <Typography className="flex gap-2">
                        <Typography component="legend" className="mt-1">คะแนน:</Typography>
                        <Rating
                            name="rating"
                            value={value}
                            size="large"
                            className="text-yellow-400"
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        />
                    </Typography>
                    <TextField label="ความคิดเห็น" name="comment" variant="outlined" className="w-full mt-4"/>
                    <Button type="submit" variant="contained" className="w-full h-10 mt-4 text-white">ยืนยัน</Button>
                </form>
                </Box>
            </Modal>
            <section ref={dormitoryOnlyStore.targetReview} className="card p-4 mt-2 relative overflow-hidden">
                <span className="absolute w-80 h-80 bg-sky-400/10 dark:bg-sky-900/10 -top-20 -left-44 rotate-[50deg] rounded-[3rem]"></span>
                <span className="absolute w-[35rem] h-72 bg-blue-300/[.05] dark:bg-blue-950/10 -top-10 -left-40 -rotate-[30deg] rounded-[2rem]"></span>
                <h1 className="font-semibold text-lg mb-4 relative">
                    การให้คะแนนและบทรีวิวโดยรวม
                    <p className="text-sm opacity-70">
                        จากบทรีวิวจำนวน {totalReviews} รายการของผู้เข้าพักที่ได้รับการยืนยัน
                    </p>
                    <IconButton aria-label="readReview" onClick={()=>setOpen(true)} color="primary" size="small" className="absolute right-0 top-0 text-sm">
                        <EditIcon />
                    </IconButton>
                </h1>
                <div className="flex sm:items-center flex-col sm:flex-row">
                    <div className="flex-y-center gap-8 me-12 mt-4 sm:mt-0">
                        <div className="flex-center aspect-square rounded-full h-24 sm:h-28 bg-blue-400
                        outline outline-8 outline-offset-4 outline-blue-300 dark:outline-blue-600/40 ms-3 sm:ms-10 font-bold text-[2.5rem] sm:text-5xl text-white">
                            4.5
                        </div>
                        <div className="text-2xl font-medium">
                            <TextStateReview score={dormitoryOnlyStore.data?.reviewScore} countReview={totalReviews}/>
                            <h1 className="text-yellow-400 text-xl">
                                <Starscore score={dormitoryOnlyStore.data?.reviewScore}/>
                            </h1>
                        </div>
                    </div>
                    <div className="sm:flex-1 flex flex-col gap-2 mt-6 sm:mt-0 sm:me-8">
                        {[5, 4, 3, 2, 1].map(score => {
                            const count = reviewData.filter(item => item.score === score).length;
                            const percentage = totalReviews > 0 ? CountPercent(count, totalReviews) : 0;

                            return (
                                <div className="flex-y-center gap-2" key={score}>
                                    <p className="text-base font-medium">{score}</p>
                                    <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-gray-800">
                                        <div 
                                            style={{ width: `${percentage}%` }}
                                            className="h-full rounded-full bg-blue-400">
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium opacity-50 hidden sm:block w-8 ms-2">
                                        {count}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ul className="mt-8 flex flex-col gap-2">
                    {reviewData.map((item, i) => (
                        item.content && item.score && (
                            <li className="p-4 border-items rounded-xl" key={i}>
                                <div className="flex relative gap-2">
                                    <div className="flex gap-2">
                                        <p className="text-base font-medium">{item.user.firstname ? item.user.firstname : "Not Name"} {item.user?.lastname}</p>
                                        <p className="text-xs mt-[.35rem] opacity-70">{StringDatetimeToDate(item.createdAt)}</p>
                                    </div>
                                    <div className="absolute right-0 flex flex-col items-end justify-end">
                                        <p className="text-blue-400 bg-blue-100 dark:bg-blue-950 
                                        px-2 py-[0.15rem] rounded-full text-xs flex-y-center gap-1"> 
                                            <FaStar/><span className="mt-1">{item.score}</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm opacity-80 flex-y-center mt-2">
                                    <BiSolidComment className="me-2 text-blue-400"/>
                                    {item.content}
                                </p>
                            </li>
                        )
                    ))}
                </ul>
            </section>
        </>
    );
});

export default Review;
