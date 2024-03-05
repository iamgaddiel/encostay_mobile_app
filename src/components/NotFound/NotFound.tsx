import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { balloonOutline, refreshOutline } from "ionicons/icons"

const NotFound: React.FC<{ heading: string, subheading: string }> = ({ heading, subheading }) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>
            <IonGrid>
                <IonRow className="ion-justify-content-center ion-text-center">
                    <IonCol size="12" className="text-muted">
                        <IonIcon icon={refreshOutline} size="large" className="fs-1" />
                    </IonCol>
                    <IonCol size="12">
                        <h1>{heading}</h1>
                        <small className="lead text-muted fs-small">{subheading}</small>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}

export default NotFound