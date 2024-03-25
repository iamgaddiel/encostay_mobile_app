import { IonButton, IonContent, IonIcon, IonPage, IonTextarea, useIonLoading, useIonRouter, useIonToast } from '@ionic/react'
import { AddExtraApartmentRuleType } from '../../@types/apartments'
import BackHeader from '../../components/BackHeader'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import { checkmarkOutline, close, warning } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'
import { userAtom } from '../../atoms/appAtom'
import { base64ToFile, base64ToUint8Array, getBase64Details, uint8ArrayToFile } from '../../helpers/utils'
import { createApiCollection } from '../../helpers/apiHelpers'
import { APARTMENTS_COLLECTION, USER } from '../../helpers/keys'


const { serverBaseUrl, pocketbaseUrl } = Settings()


const AddApartmentExtras = () => {
    const [presentToast, dismissToast] = useIonToast()

    const router = useIonRouter()

    const { record: user, token } = useRecoilValue(userAtom)

    // const setAddApartmentState = useSetRecoilState(addApartmentAtom)

    const addApartmentState = useRecoilValue(addApartmentAtom)

    const [presentLoading, dismissLoading] = useIonLoading()

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddExtraApartmentRuleType>()








    const handleFormSubmit: SubmitHandler<AddExtraApartmentRuleType> = async (data) => {
        try {

            await presentLoading('Loading...')

            const apartmentDetail = { ...addApartmentState, ...data, host:  user?.id}

            const { isCreated } = await createApiCollection(APARTMENTS_COLLECTION, apartmentDetail, token)

            if (!isCreated) {
                await dismissLoading()
                presentToast({
                    message: 'Apartment could not be uploaded',
                    icon: warning,
                    color: 'danger',
                    position: 'top',
                    header: 'Server Error',
                    duration: 5000,
                    buttons: [
                        {
                            icon: close,
                            handler: () => dismissToast(),
                            side: 'end',
                            role: 'dismiss'
                        }
                    ]
                })
                return
            }

            await dismissLoading()
            presentToast({
                message: 'Apartment added successfully',
                icon: warning,
                color: 'success',
                position: 'top',
                header: 'Success',
                duration: 5000,
                buttons: [
                    {
                        icon: close,
                        handler: () => dismissToast(),
                        side: 'end',
                        role: 'dismiss'
                    }
                ]
            })
            router.push('/apartments')
        }
        catch (error: any) {
            console.log("🚀 ~ file: AddApartmentExtras.tsx:72 ~ consthandleFormSubmit:SubmitHandler<AddExtraApartmentRuleType>= ~ error:", error)
            await dismissLoading()
            presentToast({
                message: 'Something went wrong with uploading your apartment details',
                icon: warning,
                color: 'danger',
                position: 'top',
                header: 'Server Error',
                duration: 4000,
                buttons: [
                    {
                        icon: close,
                        handler: () => dismissToast(),
                        side: 'end',
                        role: 'dismiss'
                    }
                ]
            })
            return
        }
    }


    return (
        <IonPage>
            <BackHeader backLink='/add_apartment_image' title='Add Extras' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* 
          -----------------------------------------------------------------
          ----------------------------- Extras -------------------
          -----------------------------------------------------------------
        */}
                    <div className="mt-2 ion-padding">
                        <small className="text-muted ion-text-uppercase block border-bottom">
                            Extras
                        </small>
                    </div>
                    {/* 
                    ------------------------------- [ Additional Rules ] -----------------------
                */}
                    <div className="mt-2 ion-padding-horizontal">
                        <small>State Additional Rules <i>(optional)</i></small>
                        <div className="rounded-5 mt-3" >
                            <IonTextarea
                                placeholder="Lights out by 10:00pm"
                                autoGrow
                                {...register('additional_rules')}
                                className='grey_bg rounded-3'
                                style={{ backgroundColor: "var(--white-4)", maxHeight: '30vh', overflowY: 'scroll' }}
                            />
                        </div>
                    </div>

                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='6' maxPage='6' />
                        { }
                        Add Apartment
                        <IonIcon icon={checkmarkOutline} slot='end' />
                    </IonButton>
                </form>

            </IonContent>
        </IonPage>
    )
}

export default AddApartmentExtras

function dataURItoBlob(arg0: string): BlobPart[] {
    throw new Error('Function not implemented.')
}
