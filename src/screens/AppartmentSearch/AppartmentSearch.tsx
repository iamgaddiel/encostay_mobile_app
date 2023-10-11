import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, chevronForward, optionsOutline } from "ionicons/icons";
import { useState } from "react";
import SpaceBetween from "../../components/style/SpaceBetween";
import HomeListCard from "../../components/HomeListCard/HomeListCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { listApartments } from "../../helpers/utils";
import RoomLnd from "../../assets/images/room-ld.png";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/NotFound";

const AppartmentSearch = () => {
  const { token: authToken } = useRecoilValue(userAtom);
  const [pageNumber, setPageNumber] = useState(1)


  //TODO: use ReactQuery
  const { data: apartmentList, isLoading } = useQuery({
    queryKey: ['searchApartmentList', pageNumber],
    queryFn: () => loadApartments(pageNumber)
  })




  async function loadApartments(page: number) {
    try {
      const options = { perPage: 5, page }
      const response = await listApartments(authToken, options);
      return response
    }
    catch (err: any) {
      throw new Error('There was an error getting apartments')
    }
  }


  if (isLoading) {
    return (
      <>
        <IonSkeletonText
          animated
          className="w-100 rounded-4"
          style={{ height: "20px" }}
        />
        <IonSkeletonText
          animated
          className="w-100 my-3 rounded-3"
          style={{ height: "270px" }}
        />
        <IonSkeletonText
          animated
          className="w-100 my-3 rounded-3"
          style={{ height: "270px" }}
        />
        <IonSkeletonText
          animated
          className="w-100 my-3 rounded-3"
          style={{ height: "270px" }}
        />
        <IonSkeletonText
          animated
          className="w-100 my-3 rounded-3"
          style={{ height: "270px" }}
        />
        <IonSkeletonText
          animated
          className="w-100 my-3 rounded-3"
          style={{ height: "270px" }}
        />
      </>
    )
  }


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-padding-end pr-2">
          <IonTitle>Apartments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonSearchbar className="ion-no-border home_search_bar" mode="ios" />
        <section className="filter_section">
          <SpaceBetween className="mt-2">
            <div className="d-flex justify-content-equally">
              <IonButton className="yellow_fill">Guests</IonButton>
              <IonButton className="yellow" fill="outline">
                Set date
              </IonButton>
            </div>
            <IonButton
              className="bg-dark"
              size="default"
              routerDirection="forward"
              routerLink="/filter"
            >
              <IonIcon icon={optionsOutline} size="large" />
            </IonButton>
          </SpaceBetween>
        </section>

        <section className="appartment_counter mt-3">
          <div className="my-3 text-muted">
            <span>{apartmentList?.totalItems}+ places to stay</span>
          </div>

          <div className="mt-4">
            {apartmentList &&
              apartmentList?.totalItems >= 1 ?
              apartmentList.items.map((home) => (
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
              )) : <NotFound heading="No Apartments" subheading="There isn't any apartment listing" />
            }
          </div>
        </section>


        {/* 
            -----------------------------------------------------------
            ------------------ [Pagination] ------------------------
            -----------------------------------------------------------
             */}
        <section className="my-4">
          <div className="d-flex align-items-center justify-content-center">
            {/* <IonButton
              fill={'solid'}
              color={'warning'}
              disabled={apartmentList?.page === 1}
              onClick={() => setPageNumber((pgN) => 1)}

            >
              {'First'}
            </IonButton> */}

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
              disabled={apartmentList?.page === apartmentList?.totalPages}
              onClick={() => setPageNumber((pgN) => pgN + 1)}
            >
              <IonIcon icon={chevronForward} />
            </IonButton>
            
            {/* <IonButton
              fill={'solid'}
              color={'warning'}
              disabled={apartmentList?.page === apartmentList?.totalPages}
              onClick={() => setPageNumber((pgN) => apartmentList?.totalPages!)}
            >
              {'Last'}
            </IonButton> */}
          </div>
          {/* Diisplay current page and total number of paginated pages */}
          <div className="text-center text-muted">
            <IonText>{apartmentList?.page} of {apartmentList?.totalPages}</IonText>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default AppartmentSearch;
