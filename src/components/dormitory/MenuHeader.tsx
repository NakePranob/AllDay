'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { observer } from "mobx-react";
import dormitoryOnlyStore from "@/stores/dormitoryOnlyStore";


// Material UI
import { Button } from "@mui/material"
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// Icons
import { FaArrowUpWideShort } from "react-icons/fa6";

const MenuHeader = observer((props: any) => {
    useEffect(() => {
        dormitoryOnlyStore.setData(props.data);
    }, [])
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="hidden sm:flex justify-between container items-end h-14">
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="ภาพรวม" sx={{ fontWeight: "bold" }}/>
                <Tab label="ห้องพัก" sx={{ fontWeight: "bold" }}/>
                <Tab label="สิ่งอำนวยความสะดวก" sx={{ fontWeight: "bold" }}/>
                <Tab label="รายการรีวิว" sx={{ fontWeight: "bold" }}/>
            </Tabs>
            <div className="flex-y-center gap-2">
                <Link href={dormitoryOnlyStore.data.doc ? dormitoryOnlyStore.data.doc : '#'} className="font-bold opacity-70 hover:opacity-100 mb-1">เอกสารเกี่ยวกับฉัน</Link>
                <Button 
                    variant="text" 
                    sx={{ fontWeight: "bold", marginBottom: ".25rem", fontSize: "1rem",
                        display: "flex", alignItems: "center", gap: ".5rem"
                    }}
                    className="hidden md:flex"
                >
                    <p>กลับไปด้านบน</p><FaArrowUpWideShort/>
                </Button>
            </div>
        </div>
    )
})

export default MenuHeader