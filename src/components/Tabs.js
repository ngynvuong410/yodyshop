import React,{useState} from 'react'

export const Tabs = (props) => {
    const {items,onclick} =props
     const [activeIndex, setactiveIndex] = useState(0)
  
     const handelActiveIndex = (idx)=>{
        if(typeof onclick == 'function'){
            onclick(activeIndex)
           }
           setactiveIndex(idx)
     }
     
    return (
        <div className="tabs">
            {
                items.map((item,idx)=>{
                    return(
                        <div className={`tabs__item ${activeIndex==idx?'active':''}`} key={idx}
                        onClick={()=>handelActiveIndex(idx)}
                        >
                          {item}
                        </div>
                    )
                })
            }
        </div>
    )
}
