import { forgetPasswordState } from '../../signals/passwordResetAtom'
import PasswordRestForm from '../PasswordRestForm/PasswordRestForm'
import PasswordResetSuccessful from '../PasswordResetSuccessful/PasswordResetSuccessful'
import PasswordResetFailed from '../PasswordResetFailed/PasswordResetFailed'


// css
import "./ResetPassword.css"

const ResetPassword = () => {

    if (forgetPasswordState.value === "success") {
        return <PasswordResetSuccessful />
    }


    if (forgetPasswordState.value === "failed") {
        return <PasswordResetFailed />
    }

    return <PasswordRestForm />
}

export default ResetPassword