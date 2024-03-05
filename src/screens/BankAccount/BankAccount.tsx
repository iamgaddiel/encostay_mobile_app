import { IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonItem, IonList, IonPage, IonRadio, IonRadioGroup, IonSkeletonText, IonText } from '@ionic/react'
import { useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'

// 
import MC from "../../assets/images/label.svg"
import SpaceBetween from '../../components/style/SpaceBetween'
import { pencil } from 'ionicons/icons'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { BankItem, BankList } from '../../@types/bank'
import { userAtom } from '../../atoms/appAtom'
import { listApiCollection } from '../../helpers/apiHelpers'
import { BANKS_COLLECTION } from '../../helpers/keys'
import NotFound from '../../components/NotFound'





const BankAccount = () => {
    const { token: authToken, record: user } = useRecoilValue(userAtom)

    
    const [surveyReason, setSurveyReason] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    
    
    const { data: bankAccountFound, isLoading } = useQuery({
        queryKey: ['getUserBankDetails'],
        queryFn: getUserBankDetails
    })
    



    async function getUserBankDetails(): Promise<BankItem[]> {
        const params = { filter: `user='${user.id}'` }
        const { data } = await listApiCollection(BANKS_COLLECTION, authToken, params) as { data: BankList }
        const userBank = data?.items
        return userBank
    }

    if (isLoading){
        return (
            <>
                <IonSkeletonText style={{ width: '100vw', height: '40px'}} animated />
                <IonSkeletonText style={{ width: '100vw', height: '40px'}} animated />
                <IonSkeletonText style={{ width: '100vw', height: '40px'}} animated />
            </>
        )
    }

    return (
        <IonPage>
            <BackHeader backLink='/me' title='Bank Account' />
            <IonContent className='ion-padding' fullscreen>

                <IonList lines='none'>
                    {
                        bankAccountFound?.length! >= 1 ? bankAccountFound?.map((bank) => (
                            <IonRadioGroup value={surveyReason}>
                                <IonItem className='ion-no-padding'>
                                    <IonCard className="mt-2 ion-margin-vertical ion-padding-horizontal w-100" style={{ backgroundColor: "var(--white-4)" }} mode='ios'>
                                        <IonCardContent className='d-flex align-items-center px-1 py-4'>
                                            <IonImg src={MC} />

                                            <IonText className='ml-3'>
                                                <small><span className="text-muted">Name: </span> { bank.account_name }</small> <br />
                                                <small>Account Number: <span className="text-muted">{bank.account_number}</span></small> <br />
                                                <small>Bank: <span className="text-muted">{bank.bank_name}</span></small>
                                            </IonText>

                                            <IonRadio name='is_favoirte' slot="end" value={() => setSurveyReason("Helo")} />
                                        </IonCardContent>
                                    </IonCard>
                                </IonItem>
                            </IonRadioGroup>
                        )) : <NotFound heading='No Bank Details Found' subheading='Could not fetching any details' />
                    }
                </IonList>


                {/* Add Payment Method */}
                <IonCard
                    className="yellow_fill mt-3"
                    mode="ios"
                    style={{ backgroundColor: "var(--white-4)" }}
                    routerDirection='forward'
                    routerLink='/add_bank'

                >
                    <IonCardContent className='p-3'>
                        <SpaceBetween>
                            <div className="rounded-4 d-flex align-items-center justify-content-center ion-padding" style={{ width: "100px", height: "80px", backgroundColor: "var(--text-color2)" }}>
                                <IonIcon icon={pencil} size='large' color='warning' />
                            </div>

                            <div className='ml-4'>
                                <strong>Add a bank account</strong>
                                <small className='block mt-1 text-muted'>
                                    A least one bank account must be added in other to withdraw from your wallet
                                </small>
                            </div>
                        </SpaceBetween>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage >
    )
}

export default BankAccount



// <IonContent className='ion-padding' fullscreen>
// <div className='ion-margin-vertical ion-padding-horizontal'>
//     <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
//         <IonInput
//             type="password"
//             placeholder='0123456790'
//             label='Enter Account Number'
//             labelPlacement='floating'
//             className='ion-no-border'
//             mode='ios'
//             inputMode='numeric'
//         />
//     </div>
// </div>
// <div className='ion-margin-vertical ion-padding-horizontal' style={{ backgroundColor: "var(--white-4)" }}>
//     <IonInput
//         type="date"
//         placeholder='01/10/1998'
//         label='Enter your birthday'
//         labelPlacement='floating'
//         className='ion-no-border'
//         mode='ios'
//     />
// </div>
// <div className='ion-margin-vertical ion-padding-horizontal' style={{ backgroundColor: "var(--white-4)" }}>
//     <IonInput
//         type="text"
//         placeholder='GTBank'
//         label='Enter your bank'
//         labelPlacement='floating'
//         className='ion-no-border'
//         mode='ios'
//     />
// </div>
// {/* <div className='ion-margin-vertical ion-padding-horizontal'>
//     <IonLabel>Confirm Password</IonLabel>
//     <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
//         <IonInput
//             type="password"
//             placeholder=''
//         />
//     </div>
// </div> */}
// <small className="block mt-1 text-muted ion-padding-horizontal">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
// </small>

// <IonButton
//     className="yellow_fill mt-5"
//     shape="round"
//     mode="ios"
//     size="large"
//     expand='block'
// >
//     Confirm
// </IonButton>
// </IonContent>