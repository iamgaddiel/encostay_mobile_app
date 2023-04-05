import React from 'react'



const NotFound: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <div className='ion-text-center'>
                <h1 className='text-center text-muted display-1'>😄</h1>
                <small className="lead text-muted">{message}</small>
            </div>
        </div>
    )
}

export default NotFound