'use client'
import { observer } from "mobx-react"
import Image from "next/image"
import Link from "next/link"

// Material UI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Card = observer(() => {
    return (
        <section className="card col-span-6 md:col-span-4 lg:col-span-3 relative transition-300
        hover:shadow-2xl hover:shadow-blue-300/60">
            <Link href={'/'} className="absolute top-0 right-0 w-full h-full"></Link>
            <Image
                src={"/404.png"}
                alt="Card Image"
                width={300}
                height={300}
                className="w-full aspect-square rounded-t-2xl"
                loading="lazy"
            />
            <div className="px-4 py-2 flex">
                <div className="w-4/5">
                    <h1 className="text-lg font-medium text-ellipsis overflow-hidden whitespace-nowrap">
                        Card Title Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h1>
                    <p className="text-sm -mt-1 opacity-70">Card Description</p>
                </div>
                <div className="flex justify-end w-1/5">
                    <IconButton aria-label="delete" className="aspect-square -me-2">
                        <DeleteIcon />
                    </IconButton>
               </div>
            </div>
            <div className="px-4 py-2 flex justify-between border-t-2 border-dashed 
            border-slate-200 dark:border-slate-500 items-end mt-2">
                <p className="text-xl font-medium">
                    <span className="font-bold text-sm">฿</span>
                    2500
                </p>
                <Button 
                    variant="contained" 
                    sx={{ 
                        borderRadius: '3rem', 
                        color: 'white',
                        marginRight: '-0.25rem'
                    }}>
                        <Link href={'/'}>ดูหอพัก</Link>
                </Button>
            </div>
        </section>
    )
})

export default Card