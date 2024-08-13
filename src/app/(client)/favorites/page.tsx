import Card from "@/components/favorites/Card"

const page = () => {
    return (
        <div className='pt-16 md:pt-24 pb-10 container
        grid grid-cols-12 gap-x-1 gap-y-2 sm:gap-4'>
            <h1 className="col-span-12 text-2xl mt-2 font-semibold border-b
            border-slate-300 dark:border-slate-800 pb-2">รายการหอพักที่คุณสนใจ</h1>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>

        </div>
    )
}

export default page