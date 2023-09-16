import { IonIcon } from "@ionic/react"
import { cloudOfflineOutline, sadOutline } from "ionicons/icons"

const NotFound: React.FC<{heading: string, subheading: string }> = ({ heading, subheading }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
            <div className='ion-text-center'>
                <h3 className='text-center text-muted display-1'>
                    <IonIcon icon={cloudOfflineOutline} size="large" />
                </h3>
                <h1>{heading}</h1>
                <small className="lead text-muted">{subheading}</small>
            </div>
        </div>
    )
}

export default NotFound