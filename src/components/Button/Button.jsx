import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    
    const bg = props.bg ? 'bg-' + props.bg : 'bg-main'
    const size = props.size ? 'btn-' + props.size : ''

    return (
        <button
            className={`btn ${bg} ${size}`}
            onClick={props.onClick ? () => props.onClick() : undefined}
        >
            <span className='btn__txt'>{props.children}</span>
        </button>
    )
}

Button.propTypes = {
    bg: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func
}

export default Button