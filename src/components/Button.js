import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
     const type = props.type?'button--type1':'button--type2'
     const backgruond = props.background ?'bg-'+props.background :''
     const size = props.size?props.size:''
     const animate = props.animate?'animate':''
     
    return (
        <button 
            className={`btn ${type} ${backgruond} ${size} ${animate}`}
            onClick = {props.onclick? ()=>props.onclick():null}
            >
            {
                props.children
            }
        </button>
    )
}

Button.propTypes = {
    //TYPE button [rectangular - squares]
  
   background:PropTypes.string,
   size:PropTypes.string,
   animate:PropTypes.bool,
   onclick:PropTypes.func
}

export default Button
