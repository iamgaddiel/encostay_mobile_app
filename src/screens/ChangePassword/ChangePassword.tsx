import { IonButton, IonContent, IonIcon, IonInput, IonLabel, IonPage } from '@ionic/react'
import BackHeader from '../../components/BackHeader/BackHeader'
import { useState } from 'react'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'



interface PasswordTooggle {
    showNewPassword?: boolean,
    showConfirmPassword?: boolean
    showCurrentPassword?: boolean
}

const ChangePassword = () => {
    const [passwordTooggle, setPasswordToggle] = useState<PasswordTooggle>({
        showNewPassword: false,
        showConfirmPassword: false,
        showCurrentPassword: false
    })



    async function handlePasswordReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()



    }



    return (
        <IonPage>
            <BackHeader backLink='/me' title='Chnage Password' />

            <IonContent className='ion-padding' fullscreen>
                <form onSubmit={handlePasswordReset}>
                    {/* Current Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal'>
                        <IonLabel>Enter Current Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type={passwordTooggle.showCurrentPassword ? 'text' : 'password'} />
                            <IonIcon icon={passwordTooggle.showCurrentPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showCurrentPassword: !passwordTooggle.showCurrentPassword
                            })} className='block' />
                        </div>
                    </div>

                    {/* New Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal' >
                        <IonLabel>Enter New Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type={passwordTooggle.showNewPassword ? 'text' : 'password'} />
                            <IonIcon icon={passwordTooggle.showNewPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showNewPassword: !passwordTooggle.showNewPassword
                            })} className='block' />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal'>
                        <IonLabel>Confirm Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type={passwordTooggle.showConfirmPassword ? 'text' : 'password'} />
                            <IonIcon icon={passwordTooggle.showConfirmPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showConfirmPassword: !passwordTooggle.showConfirmPassword
                            })} className='block' />
                        </div>
                    </div>
                    <small className="block mt-1 text-muted ion-padding-horizontal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
                    </small>
                </form>

                <IonButton
                    className="yellow_fill mt-5"
                    shape="round"
                    mode="ios"
                    size="large"
                    expand='block'
                >
                    Confirm
                </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default ChangePassword