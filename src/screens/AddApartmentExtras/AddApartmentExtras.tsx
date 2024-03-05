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


const { serverBaseUrl } = Settings()


const AddApartmentExtras = () => {
    const [presentToast, dismissToast] = useIonToast()

    const router = useIonRouter()

    const { record: user } = useRecoilValue(userAtom)

    // const setAddApartmentState = useSetRecoilState(addApartmentAtom)

    const addApartmentState = useRecoilValue(addApartmentAtom)

    const [presentLoading, dismissLoading] = useIonLoading()



    const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddExtraApartmentRuleType>()

    const handleFormSubmit: SubmitHandler<AddExtraApartmentRuleType> = async (data) => {
        try {

            await presentLoading('Loading...')

            const apartmentDetail = { ...addApartmentState, ...data }

            // const { mimeType: imgOneMimetype, filetype: imgOneFileType, base64Data: imgOneBase64String } = getBase64Details(apartmentDetail.image_1!)

            // const image1: File = await base64ToFile(imgOneBase64String, `image1.${imgOneFileType}`, imgOneMimetype)


            // const serverUrl = `${serverBaseUrl}/image_kit/upload`
            const csrfToken = getCookie('csrftoken');

            if (!csrfToken) {
                console.error('CSRF token not found.');
                return;
            }

            const serverUrl = `${'http://localhost:8000'}/upload/`
            const headers = { 'Content-Type': 'application/form-data' }
            // const headers = { 'Content-Type': `multipart/form-data; boundary='--WebKitFormBoundary7MA4YWxkTrZu0gW--'`, 'X-CSRFToken': csrfToken}
            // const headers = { 'Content-Type': `application/x-www-form-urlencoded` }

            // Assume you have an Image object
            // Example data URL
            const dataURL = apartmentDetail.image_1!; // Replace with your actual data URL

            // Create a new Image object
            const img = new Image();

            // Set the data URL as the source
            img.src = dataURL;




            // Convert data URL to Blob
            // const blob = dataURLtoBlob(dataURL);

            // Create FormData and append the Blob
            const formData = new FormData();
            // formData.append('image', blob, 'image.jpg');

            // The FormData object can now be sent in a request, e.g., using XMLHttpRequest or fetch
            const { data: serverResponse } = await _post(serverUrl, formData, headers)

            console.log("🚀 ~ file: AddApartmentExtras.tsx:46 ~ consthandleFormSubmit:SubmitHandler<AddExtraApartmentRuleType>= ~ serverResponse:", serverResponse)

            setTimeout(() => {
                (async () => {
                    await dismissLoading()
                })()
            }, 5000)
            // router.push('/add_apartment_rules')
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
        }
    }



    // Function to convert data URL to Blob
    function dataURLtoBlob(dataURL: any) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }


    function getCookie(name: string): string | null {
        const cookieValue = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith(name + '='));

        return cookieValue ? cookieValue.split('=')[1] : null;
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
