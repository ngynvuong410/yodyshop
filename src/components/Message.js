import React from 'react'

export const Message = ({background,message}) => {
    return (
        <div className={`message alert alert-${background} `} role="alert">
            {message}
        </div>
    )
}
