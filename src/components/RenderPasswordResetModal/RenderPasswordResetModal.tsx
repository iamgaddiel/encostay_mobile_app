import React from 'react'
import ForgetPasswordModal from '../ForgetPasswordModal/ForgetPasswordModal'
import OtpModal from '../OtpModal/OtpModal'
import ResetPassword from '../ResetPassword/ResetPassword'



interface Props {
    screen: string
}

const RenderPasswordResetModal: React.FC = () => {


    function renderModal(screen: string) {
        switch (screen) {
            // case 'forget_password':
            //     return <ForgetPasswordModal />

            case 'otp':
                return <OtpModal />

            case 'reset':
                return <ResetPassword />
        }
    }

    return (
        <ForgetPasswordModal />
    )
}

export default RenderPasswordResetModal