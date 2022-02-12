import React from 'react'

export const Swiper = ({items}) => {
    return (
        <div className="swiper">
            {
                items.map((item,idx)=>{
                    return (
                        <div className="swiper__item" key={idx}>
                                 <img src='https://bizweb.dktcdn.net/100/438/408/themes/843441/assets/page_nam_cate_icon_2.svg?1637993925815'/>
                                 <p>{item}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
