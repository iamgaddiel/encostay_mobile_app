import { IonIcon } from "@ionic/react"
import { balloonOutline } from "ionicons/icons"

const NotFound: React.FC<{heading: string, subheading: string }> = ({ heading, subheading }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
            <div className='ion-text-center'>
                <h3 className='text-center text-muted display-1'>
                    <IonIcon icon={balloonOutline} size="large" />
                </h3>
                <h1>{heading}</h1>
                <small className="lead text-muted fs-small">{subheading}</small>
            </div>
        </div>
    )
}

export default NotFound