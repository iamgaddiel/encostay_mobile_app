import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { optionsOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import SpaceBetween from "../../components/style/SpaceBetween";
import { demoRoomsAtom } from "../../atoms/demoAtoms";
import HomeListCard from "../../components/HomeListCard/HomeListCard";
import { useRecoilValue } from "recoil";
import { ApartementList } from "../../@types/apartments";
import { userAtom } from "../../atoms/appAtom";
import { listApartments } from "../../helpers/utils";
import RoomLnd from "../../assets/images/room-ld.png";

const AppartmentSearch = () => {
  const rooms = useRecoilValue(demoRoomsAtom);
  const { token: authToken } = useRecoilValue(userAtom);
  const [apartmentList, setApartmentList] = useState<ApartementList | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  //TODO: use ReactQuery

  useEffect(() => {
    loadApatments();
  }, []);

  async function loadApatments() {
    const response = await listApartments(authToken);
    setApartmentList(response);
    setIsLoading(false);
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
            {!isLoading ? (
              <>
                {apartmentList &&
                  apartmentList?.totalItems >= 1 &&
                  apartmentList.items.map((home) => (
                    <HomeListCard
                      has_wifi={home.has_wifi}
                      // is_favourite={home.isFavourite}
                      location={{
                        country: home.country,
                        state: home.state_location,
                      }}
                      imageUri={RoomLnd}
                      numberOfBedrooms={home.bedrooms}
                      price={home.price}
                      ratings={4}
                      showRattings={true}
                      title={home.title}
                      homeId={home.id!}
                      key={home?.id!}
                    />
                  ))}
              </>
            ) : (
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
            )}
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default AppartmentSearch;
