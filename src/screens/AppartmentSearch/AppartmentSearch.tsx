import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronBack, chevronForward, optionsOutline } from "ionicons/icons";
import { useState } from "react";
import HomeListCard from "../../components/HomeListCard/HomeListCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { listApartments } from "../../helpers/utils";
import RoomLnd from "../../assets/images/room-ld.png";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/NotFound";
import SekeletonLoadingFullWidth from "../../components/SekeletonLoadingFullWidth";
import { ApartmentSearchOptions } from "../../@types/apartments";





const AppartmentSearch = () => {
  const { token: authToken } = useRecoilValue(userAtom);
  const router = useIonRouter()

  const [pageNumber, setPageNumber] = useState(1)
  const [apartmentTitle, setApartmentTitle] = useState('')

  //TODO: look for a better way to handle searching

  const { data: apartmentList, isLoading } = useQuery({
    queryKey: ['searchApartmentList', pageNumber, apartmentTitle],
    queryFn: () => fetchApartments(pageNumber, apartmentTitle)
  })


  useIonViewDidEnter(() => {
    setApartmentTitle('')
  }, [])




  async function fetchApartments(page: number, title: string) {
    try {
      let options: ApartmentSearchOptions = { perPage: 5, page }
      if (title !== '') options = { perPage: 5, page, filter: `title="${title}"` };
      return await listApartments(authToken, options);
    }
    catch (err: any) {
      throw new Error('There was an error getting apartments')
    }
  }





  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-padding-end pr-2">
          <IonTitle>Apartments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="10" sizeMd="11" sizeXs="10">
              <IonSearchbar className="ion-no-border home_search_bar" mode="ios" onKeyUp={(e) => setApartmentTitle(e.currentTarget.value as string)} />
            </IonCol>
            <IonCol size="auto" >
              <IonIcon color="warning" icon={optionsOutline} size="large" onClick={() => router.push('/apartment_search_filter/')} />
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Apartment Count */}
        <section className="appartment_counter mt-3">
          <div className="my-3 text-muted">
            <span>{apartmentList?.totalItems}+ places to stay</span>
          </div>

          {
            isLoading ? (
              <SekeletonLoadingFullWidth count={4} height={120} width={100} />
            ) : (
              <div className="mt-4">
                <IonGrid>
                  <IonRow>
                    {apartmentList &&
                      apartmentList?.totalItems >= 1 ?
                      apartmentList.items.map((home) => (
                        <IonCol size="12" sizeSm="6" sizeLg="4" sizeXl="3">
                          <HomeListCard
                            has_wifi={home.has_wifi}
                            location={{
                              country: home.country,
                              state: home.state_location,
                            }}
                            imageUri={RoomLnd}
                            numberOfBedrooms={home.bedrooms}
                            price={home.price}
                            ratings={4}
                            showRatings={true}
                            title={home.title}
                            homeId={home.id!}
                            key={home?.id!}
                          />
                        </IonCol>
                      )) : <NotFound heading="No Apartments" subheading="There isn't any apartment listing" />
                    }
                  </IonRow>
                </IonGrid>
              </div>
            )
          }
        </section>


        {/* 
            -----------------------------------------------------------
            ------------------ [Pagination] ------------------------
            -----------------------------------------------------------
             */}
        <section className="my-4">
          <div className="d-flex align-items-center justify-content-center">

            {/* Back Button */}
            <IonButton
              fill={'solid'}
              color={'warning'}
              disabled={apartmentList?.page === 1}
              onClick={() => setPageNumber((pgN) => pgN - 1)}
            >
              <IonIcon icon={chevronBack} />
            </IonButton>


            {/* Forward Button */}
            <IonButton
              fill={'solid'}
              color={'warning'}
              disabled={apartmentList?.page === apartmentList?.totalPages || apartmentList?.totalPages! < 1}
              onClick={() => setPageNumber((pgN) => pgN + 1)}
            >
              <IonIcon icon={chevronForward} />
            </IonButton>

          </div>

          <div className="text-center text-muted">
            <IonText>page {apartmentList?.page} of {apartmentList?.totalPages}</IonText>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default AppartmentSearch;
