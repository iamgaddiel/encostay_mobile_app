import React from 'react'

const SpaceEvently: React.FC<PropType> = ({ children, className }) => {
    return (
        <div className={`d-flex align-item-center justify-content-evenly ${className}`}>
            {children}
        </div>
    )
}

type PropType = {
    children: any
    className?: string
}

export default SpaceEvently