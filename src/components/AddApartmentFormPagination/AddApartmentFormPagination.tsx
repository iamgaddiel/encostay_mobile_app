import React from 'react'


interface Props {
  currentPage: string
  maxPage: string
}
const AddApartmentFormPagination: React.FC<Props> = ({ currentPage, maxPage }) => {
    return (
      <div className='ion-text-center mx-2'>
        <small>{currentPage} / {maxPage}</small>
      </div>
  )
}

export default AddApartmentFormPagination
