import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonLabel, IonPage, IonRow, useIonLoading, useIonRouter, useIonToast, useIonViewWillEnter } from '@ionic/react'
import React, { useRef, useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { Camera, CameraResultType } from '@capacitor/camera'
import { warningOutline, chevronForward, checkmark } from 'ionicons/icons'
import AddApartmentFormPagination from '../../components/AddApartmentFormPagination'

import ImagePlaceholder from "../../assets/images/insert-picture-icon.png";
import { useRecoilState, useSetRecoilState } from 'recoil'
import { addApartmentAtom } from '../../atoms/apartmentAtom'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'

import { IKUpload } from 'imagekitio-react';




type ImageCollection = {
    image1?: {
        url: string,
        thumbnail: string
    },
    image2?: {
        url: string,
        thumbnail: string
    },
    image3?: {
        url: string,
        thumbnail: string
    },
}



const AddApartmentImages = () => {
    const [presentToast, _] = useIonToast()

    const router = useIonRouter()

    const [apartmentState, setAddApartmentState] = useRecoilState(addApartmentAtom)

    const [presentLoading, dismissLoading] = useIonLoading()


    const [imageUrls, setImageUrls] = useState<ImageCollection>()








    // ImageKit Upload state handlers
    async function onImageUploadError(err: any) {
        console.log("Error", err);
        await dismissLoading()
        presentToast({
            message: 'Image uploaded failed. Try again',
            duration: 3000,
            icon: warningOutline,
            color: 'danger',
            position: 'top'
        })
    };


    async function onImageUploadSuccess(res: any, imageIndex: number) {
        console.log("Success", res);
        await dismissLoading()

        if (imageIndex === 1) {
            setImageUrls({
                ...imageUrls,
                image1: {
                    thumbnail: res?.thumbnailUrl,
                    url: res?.url
                }
            })
        }
        if (imageIndex === 2) {
            setImageUrls({
                ...imageUrls,
                image2: {
                    thumbnail: res?.thumbnailUrl,
                    url: res?.url
                }
            })
        } 
        if (imageIndex === 3) {
            setImageUrls({
                ...imageUrls,
                image3: {
                    thumbnail: res?.thumbnailUrl,
                    url: res?.url
                }
            })
        }


        presentToast({
            message: 'Image uploaded successfully',
            duration: 3000,
            icon: checkmark,
            color: 'success',
            position: 'top',
        })
    };


    async function onImageUploadLoading(res: any) {
        await presentLoading({
            message: 'Uploading image',
            spinner: 'dots'
        })
    }


    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        await presentLoading({
            message: 'Loading...',
            spinner: 'dots'
        })
        

        // check if current image is same as the placeholder image or undefined
        if (typeof imageUrls?.image1?.url === 'undefined') {
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
        if (typeof imageUrls?.image2?.url === 'undefined') {
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
        if (typeof imageUrls?.image3?.url === 'undefined' ) {
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
            ...apartmentState,
            image_1: imageUrls?.image1?.url,
            image_1_thumbnail_url: imageUrls?.image1?.thumbnail,
            image_2: imageUrls?.image2?.url,
            image_2_thumbnail_url: imageUrls?.image2?.thumbnail,
            image_3: imageUrls?.image3?.url,
            image_3_thumbnail_url: imageUrls?.image3?.thumbnail
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
                                <IonCol size='12' sizeXs='12' sizeSm='6' sizeMd='4' className='mb-3'>
                                    <IKUpload
                                        onError={onImageUploadError}
                                        onSuccess={(event) => onImageUploadSuccess(event, 1)}
                                        onUploadStart={onImageUploadLoading}
                                    />

                                    <IonLabel className='text-muted'>
                                        <small>Image One</small>
                                    </IonLabel>
                                </IonCol>

                                {/* Image 2 */}
                                <IonCol size='12' sizeXs='12' sizeSm='6' sizeMd='4' className='mb-3'>
                                    <IKUpload
                                        onError={onImageUploadError}
                                        onSuccess={(event) => onImageUploadSuccess(event, 2)}
                                        onUploadStart={onImageUploadLoading}
                                    />
                                    <IonLabel className='text-muted'>
                                        <small>Image Two</small>
                                    </IonLabel>
                                </IonCol>

                                {/* Image 3 */}
                                <IonCol size='12' sizeXs='12' sizeSm='6' sizeMd='4' className='mb-3'>
                                    <IKUpload
                                        onError={onImageUploadError}
                                        onSuccess={(event) => onImageUploadSuccess(event, 3)}
                                        onUploadStart={onImageUploadLoading}
                                    />
                                    <IonLabel className='text-muted'>
                                        <small>Image Three</small>
                                    </IonLabel>
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

