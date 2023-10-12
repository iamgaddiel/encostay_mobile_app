

import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import NairaBankForm from '../../components/NairaBankForm'
import DollarBankForm from '../../components/DollarBankForm'



const AddBankAccount = () => {
    
    const {record: user} = useRecoilValue(userAtom)


    if (user.preferred_currency === 'USD') return <DollarBankForm />;

    return <NairaBankForm />
}

export default AddBankAccount