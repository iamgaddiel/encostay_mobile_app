import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, useIonLoading, useIonRouter, useIonToast } from '@ionic/react'
import React, { useRef } from 'react'
import BackHeader from '../../components/BackHeader'
import { Camera, CameraResultType } from '@capacitor/camera'
import { warningOutline, chevronForward } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'

import ImagePlaceholder from "../../assets/images/insert-picture-icon.png";
import { useSetRecoilState } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'



const AddApartmentImages = () => {
    const [presentToast, _] = useIonToast()

    const router = useIonRouter()

    const setAddApartmentState = useSetRecoilState(addApartmentAtom)

    const [presentLoading, dismissLoading] = useIonLoading()


    const apartmentImageOne = useRef<HTMLIonImgElement | null>(null);
    const apartmentImageTwo = useRef<HTMLIonImgElement | null>(null);
    const apartmentImageThree = useRef<HTMLIonImgElement | null>(null);




    // function generateBase64String(value: string): string{
    //     console.log("🚀 ~ file: AddApartmentImages.tsx:32 ~ generateBase64String ~ value:", value)
    //     const base64String = `data:image/png;base64,${value}`
    //     return base64String
    // }

    async function handleImageSelection(): Promise<string | undefined> {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                // resultType: CameraResultType.DataUrl,
                resultType: CameraResultType.DataUrl,
                // presentationStyle: 'popover'
            });

            // BEC - learn

            // let imageUrl = image.webPath!;
            // const imageUrl = image.path;
            // const imageBase64 = image.base64String

            const imageUrl = image.dataUrl!;

            return imageUrl
        }
        catch (error: any) {
            console.log("🚀 ~ file: AddApartmentImages.tsx:62 ~ handleImageSelection ~ error:", error)
        }
    }



    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await presentLoading({
            message: 'Processing image(s)',
            spinner: 'dots'
        })

        // check if current image is same as the placeholder image or undefined
        if ((apartmentImageOne.current!.src === ImagePlaceholder) || (!apartmentImageOne.current!.src)) {
            await dismissLoading()
            presentToast({
                message: 'Image One empty : select an image',
                duration: 3000,
                icon: warningOutline,
                color: 'danger',
                position: 'top'
            })
            return
        }
        if ((apartmentImageTwo.current!.src === ImagePlaceholder) || (!apartmentImageThree.current!.src)) {
            await dismissLoading()
            presentToast({
                message: 'Image Two empty : select an image',
                duration: 3000,
                icon: warningOutline,
                color: 'danger',
                position: 'top'
            })
            return
        }
        if ((apartmentImageThree.current!.src === ImagePlaceholder) || (!apartmentImageThree.current!.src)) {
            await dismissLoading()
            presentToast({
                message: 'Image Three empty : select an image',
                duration: 3000,
                icon: warningOutline,
                color: 'danger',
                position: 'top'
            })
            return
        }

        // Save files to state
        setAddApartmentState({
            image_1: apartmentImageOne.current!.src!,
            image_2: apartmentImageTwo.current!.src!,
            image_3: apartmentImageThree.current!.src!
        })

        await dismissLoading()
        router.push('/add_apartment_extras')

    }


    return (
        <IonPage>
            <BackHeader backLink='/add_apartment_time_rules' title='Add Apartment Images' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleFormSubmit}>
                    <div className="mt-2 ion-padding">
                        <small className="text-muted ion-text-uppercase block border-bottom">
                            Uploads Images
                        </small>
                    </div>

                    <div className="mt-4">
                        {/* <input type='file' onChange={e =>  console.log(e.target!.files![0])} /> */}
                        <IonGrid>
                            <IonRow className='ion-justify-content-center'>
                                {/* Image 1 */}

                                <IonCol size='6' sizeXs='10' sizeSm='6' sizeMd='4' className=''>
                                    <input
                                        className="ion-text-center"
                                        onClick={async () => {
                                            const imageUrl = await handleImageSelection()
                                            apartmentImageOne.current!.src = imageUrl
                                        }}
                                        type='file'
                                        accept="image/*"
                                        multiple={false}
                                    />
                                    <div className="ion-text-center">
                                        {/* TODO: add helper text 'i' to describe the kind of image to use  */}
                                        <small className="text-muted">Image One</small>
                                    </div>
                                </IonCol>

                                {/* <IonCol size='6' sizeXs='10' sizeSm='6' sizeMd='4' className=''>
                                    <button
                                        className="ion-text-center"
                                        onClick={async () => {
                                            const imageUrl = await handleImageSelection()
                                            apartmentImageOne.current!.src = imageUrl
                                        }}
                                        type='button'
                                    >
                                        <IonImg
                                            src={ImagePlaceholder}
                                            ref={apartmentImageOne}
                                            aria-required
                                            alt="image placeholder"
                                        />
                                    </button>
                                    <div className="ion-text-center">
                                        <small className="text-muted">Image One</small>
                                    </div>
                                </IonCol> */}

                                {/* Image 2 */}
                                <IonCol size='6' sizeXs='10' sizeSm='6' sizeMd='4'>
                                    <button
                                        className="ion-text-center"
                                        onClick={async () => {
                                            const imageUrl = await handleImageSelection()
                                            apartmentImageTwo.current!.src = imageUrl
                                        }}
                                        type='button'
                                    >
                                        <IonImg
                                            src={ImagePlaceholder}
                                            ref={apartmentImageTwo}
                                            alt="image placeholder"
                                        />
                                    </button>
                                    <div className="ion-text-center">
                                        <small className="text-muted">Image Two</small>
                                    </div>
                                </IonCol>

                                {/* Image 3 */}
                                <IonCol size='6' sizeXs='10' sizeSm='6' sizeMd='4'>
                                    <button
                                        className="ion-text-center"
                                        onClick={async () => {
                                            const imageUrl = await handleImageSelection()
                                            apartmentImageThree.current!.src = imageUrl
                                        }}
                                        type='button'
                                    >
                                        <IonImg
                                            src={ImagePlaceholder}
                                            ref={apartmentImageThree}
                                            alt="image placeholder"
                                        />
                                    </button>
                                    <div className="ion-text-center">
                                        <small className="text-muted">Image Three</small>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>

                    <IonButton
                        className="yellow_fill my-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand="block"
                        type="submit"
                    >
                        <AddApartmentFormPagination currentPage='5' maxPage='6' />
                        { }
                        Continue
                        <IonIcon icon={chevronForward} slot='end' />
                    </IonButton>

                </form>
            </IonContent>
        </IonPage >
    )
}

export default AddApartmentImages

