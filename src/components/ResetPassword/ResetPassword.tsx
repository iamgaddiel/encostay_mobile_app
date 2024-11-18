import { forgetPasswordAtom, forgetPasswordResetState } from '../../atoms/passwordResetAtom'
import PasswordResetSuccessful from '../PasswordResetSuccessful/PasswordResetSuccessful'
import PasswordResetFailed from '../PasswordResetFailed/PasswordResetFailed'
import PasswordRestForm from '../PasswordRestForm'


// css
import "./ResetPassword.css"
import { useRecoilState } from 'recoil'

const ResetPassword = () => {
    const [forgetPassword, setForgetPassword] = useRecoilState(forgetPasswordResetState)

    if (forgetPassword === "success") {
        return <PasswordResetSuccessful />
    }


    if (forgetPassword === "failed") {
        return <PasswordResetFailed />
    }

    return <PasswordRestForm />
}

export default ResetPassword