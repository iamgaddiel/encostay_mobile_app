import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'
import PasswordRestForm from '../PasswordRestForm/PasswordRestForm'
import PasswordResetSuccessful from '../PasswordResetSuccessful/PasswordResetSuccessful'
import PasswordResetFailed from '../PasswordResetFailed/PasswordResetFailed'


// css
import "./ResetPassword.css"
import { useRecoilState } from 'recoil'

const ResetPassword = () => {
    const [forgetPassword, setForgetPassword] = useRecoilState(forgetPasswordAtom)

    if (forgetPassword === "success") {
        return <PasswordResetSuccessful />
    }


    if (forgetPassword === "failed") {
        return <PasswordResetFailed />
    }

    return <PasswordRestForm />
}

export default ResetPassword