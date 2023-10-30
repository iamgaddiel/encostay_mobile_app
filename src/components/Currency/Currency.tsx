import React from 'react'


interface Props{
    currency: 'USD' | 'NGN'
}

const Currency: React.FC<Props> = ({ currency}) => {
  return (
    <>
        { currency === 'NGN' && <span>₦</span>}
        { currency === 'USD' && <span>$</span>}
    </>
  )
}

export default Currency