import { IonIcon } from "@ionic/react"
import { sadOutline } from "ionicons/icons"

const NotFound: React.FC<{heading: string, subheading: string }> = ({ heading, subheading }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <div className='ion-text-center'>
                <h1 className='text-center text-muted display-1'>
                    <IonIcon icon={sadOutline} size="large" />
                </h1>
                <h1>{heading}</h1>
                <small className="lead text-muted">{subheading}</small>
            </div>
        </div>
    )
}

export default NotFound