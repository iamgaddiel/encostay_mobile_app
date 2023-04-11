import React from 'react'
import ForgetPasswordModal from '../ForgetPasswordModal/ForgetPasswordModal'
import OtpModal from '../OtpModal/OtpModal'
import ResetPassword from '../ResetPassword/ResetPassword'



interface Props {
    index: number
}

const RenderPasswordResetModal: React.FC<Props> = ({ index}) => {

    function renderModal(modalIndex: number) {
        switch (modalIndex) {
            case 0:
                return <ForgetPasswordModal />

            case 1:
                return <OtpModal />

            case 2:
                return <ResetPassword />
        }
    }

    return (
        <>{renderModal(index)}</>
    )
}

export default RenderPasswordResetModal