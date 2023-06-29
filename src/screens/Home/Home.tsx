import { useEffect, useState } from 'react'

// images
import Man from "../../assets/images/man.png"


// css
import "./Home.css"


import GuestsAccount from '../../components/GuestAccount/GuestAccount'
import HostAccount from '../../components/HostAccount/HostAccount'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { utilsAtom } from '../../atoms/utilityAtom'
import useAuth from '../../hooks/useAuth'
import { userAtom } from '../../atoms/appAtom'
import { IonSkeletonText } from '@ionic/react'
import SpaceBetween from '../../components/style/SpaceBetween'




const Home = () => {

    // ----------------- States -----------------------
    //todo: add palceholder while fetching user image

    const { token, record: userRecord } = useAuth()
    const setAppUserObject = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(true)




    useEffect(() => {
        // set App Level User State
        if (userRecord !== null) setAppUserObject({ token, record: userRecord });

        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])



    // return TSX

    if (userRecord?.account_type === "host") {
        return <HostAccount
            userImage={Man}
        />
    }
    if (userRecord?.account_type === "guest") {
        return <GuestsAccount
            userImage={Man}
        />
    }


    return (
        <div  className='ion-padding'>
            {
                loading ? (
                    <>
                        <div>
                            <IonSkeletonText
                                animated
                                style={{ width: "100%", height: "200px" }}
                                className='rounded-4'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "95%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "80%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "90%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "80%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "90%", height: "10px" }}
                                className='mt-3'
                            />
                            <SpaceBetween className='mt-4'>
                                <IonSkeletonText
                                    animated
                                    style={{ width: "40%", height: "60px" }}
                                    className='rounded-4'
                                />
                                <IonSkeletonText
                                    animated
                                    style={{ width: "40%", height: "60px" }}
                                    className='rounded-4'
                                />

                            </SpaceBetween>

                        </div>
                        <div className='mt-5'>
                            <IonSkeletonText
                                animated
                                style={{ width: "100%", height: "200px" }}
                                className='rounded-4'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "95%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "80%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "90%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "80%", height: "10px" }}
                                className='mt-3'
                            />
                            <IonSkeletonText
                                animated
                                style={{ width: "90%", height: "10px" }}
                                className='mt-3'
                            />
                            <SpaceBetween className='mt-4'>
                                <IonSkeletonText
                                    animated
                                    style={{ width: "40%", height: "60px" }}
                                    className='rounded-4'
                                />
                                <IonSkeletonText
                                    animated
                                    style={{ width: "40%", height: "60px" }}
                                    className='rounded-4'
                                />

                            </SpaceBetween>

                        </div>
                    </>
                ) : null
            }
        </div>
    )


}

export default Home


