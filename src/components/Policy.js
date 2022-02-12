import React from 'react'

function Policy({nameIcon,typeIcon,title,description,discount}) {
    return (
        <div className='policy__cart'>
             <div className='policy__cart__service__left'>
                 <box-icon name={nameIcon} type={typeIcon} ></box-icon>
             </div>
             <div className='policy__cart__service__right'>
                <div className='policy__cart__title'>
                   {title}
                </div>
                <div className='policy__cart__sumary'>
                         {description}
                     <span>{discount}</span>
                </div>
             </div>

        </div>
    )
}

export default Policy
