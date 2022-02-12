import React from 'react'
import PropTypes from 'prop-types'

function Helmet(props) {
    document.title='YODY - ' +props.title;
    return (
        <>
            {props.children}
        </>
    )
}

Helmet.propTypes = {
 title:PropTypes.string.isRequired
}

export default Helmet


