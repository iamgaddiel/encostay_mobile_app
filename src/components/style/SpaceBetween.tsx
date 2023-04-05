import React from 'react'


const SpaceBetween: React.FC<PropType> = ({ children, className }) => {
  return (
    <div className={`d-flex align-items-center justify-content-between ${className}`}>
        { children }
    </div>
  )
}

type PropType = {
    children: any
    className?: string
}

export default SpaceBetween