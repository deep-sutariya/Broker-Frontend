"use client"
import { months } from "@/utils/MonthVar"

const Months = ({selected,setSelected}) => {
  
  return (
    <div className="flex gap-x-2 md:gap-x-4 mx-auto justify-start">
        {
            months.map((val,ind) => {
                return <button key={ind} className={`text-sm md:text-lg p-1 px-2 md:px-3 ${selected==ind ? `bg-blue rounded-lg text-common` : `` } `}
                    onClick={()=>setSelected(()=>ind)}>{val}</button>
            })
        }
    </div>
  )
}

export default Months