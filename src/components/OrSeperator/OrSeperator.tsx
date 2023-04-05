import React from 'react'


import "./OrSeperator.css"


interface OrProps {
    speratorText: string
    className: string
}

const OrSeperator: React.FC<OrProps> = ({ speratorText, className }) => {
    return (
        <section className={`or_seperator_wrpper ${className}`}>
            <span className='or_border'></span>
            <span className='or_text mx-3'>{speratorText}</span>
            <span className='or_border'></span>
        </section>
    )
}

export default OrSeperator