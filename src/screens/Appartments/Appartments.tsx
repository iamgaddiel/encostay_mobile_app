import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
  IonSkeletonText,
} from "@ionic/react";
import BackHeader from "../../components/BackHeader/BackHeader";
import {
  bedOutline,
  wifiOutline,
  chevronForwardOutline,
  codeWorkingOutline,
  scaleOutline,
  shieldOutline,
  tvOutline,
} from "ionicons/icons";
import { useRecoilValue } from "recoil";
import SpaceBetween from "../../components/style/SpaceBetween";
import { userAtom } from "../../atoms/appAtom";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/NotFound/NotFound";
import { APARTMENTS_COLLECTION } from "../../helpers/keys";
import { listApiCollection } from "../../helpers/apiHelpers";
import { ApartementList } from "../../@types/apartments";

const Appartments = () => {
  const { token: authToken, record: user } = useRecoilValue(userAtom);
  const hostId = user?.id!


  const { data: apartmentList, isLoading, isError, error } = useQuery({
    queryKey: ['hostApartmentList', hostId, authToken],
    queryFn: () => getHostApartments(hostId, authToken)
  })


  async function getHostApartments(hostId: string, authToken: string) { //
    const params = { filter: `(host="${hostId}")`};
    const { data } = await listApiCollection(
      APARTMENTS_COLLECTION,
      authToken,
      params
    );
    const aprtments = data as ApartementList;

    return aprtments
  }


  if (isError) {
    return <NotFound heading="Error" subheading="Could Not Try Again" />
  }

  return (
    <IonPage>
      <BackHeader backLink="/home" title="My Apartments" />
      <IonContent className="ion-padding" fullscreen>
        {!isLoading ? (
          <section className="home_list">
            <section className="mt-4">
              { }
              <IonButton
                shape="round"
                className="yellow_fill"
                fill="solid"
                size="small"
                expand="block"
                routerDirection="forward"
                routerLink="/add_apartment"
              >
                Add Apartment
              </IonButton>
            </section>

            <section className="mt-5">
              {apartmentList && apartmentList.totalItems >= 1 ? (
                apartmentList.items.map((home) => (
                  <IonCard
                    color={"light"}
                    className="p-2 home_list_card p-3"
                    key={home.id}
                    routerDirection="forward"
                    routerLink={`host/apartment/detail/${home.id}`}
                  >
                    {/* <IonIcon
                    icon={heart}
                    className={`home_list_card_fav_icon text-${
                      home.isFavourite ? "warning" : "light"
                    }`}
                    size="large"
                  /> */}

                    <IonCardContent>
                      <div className="home_list_card_hero_section">
                        <div>
                          <big>{home.title}</big> <br />
                          <span className="text-muted">{home.state_location}, {home.country}</span>
                          <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold mt-2">
                            <IonIcon icon={bedOutline} size="small" />
                            <span style={{ marginLeft: "7px" }}>
                              {home.bedrooms} Rooms
                            </span>
                          </SpaceBetween>
                        </div>
                        <div>
                          <span className="text-muted">
                            <big className="text-warning ">{home.price}</big>/ Day
                          </span>
                        </div>
                      </div>

                      <div className="home_list_card_info mt-3">
                        {
                          home.has_wifi && (
                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                              <IonIcon icon={wifiOutline} size="small" />
                              <span className="ms-1">Wifi</span>
                            </SpaceBetween>
                          )
                        }
                        {
                          home.has_tv_cable && (
                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                              <IonIcon icon={tvOutline} size="small" />
                              <span className="ms-1">TV</span>
                            </SpaceBetween>
                          )
                        }
                        {
                          home.has_security && (
                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                              <IonIcon icon={shieldOutline} size="small" />
                              <span className="ms-1">Security</span>
                            </SpaceBetween>
                          )
                        }
                        {
                          home.has_gym && (
                            <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                              <IonIcon icon={scaleOutline} size="small" />
                              <span className="ms-1">Gym</span>
                            </SpaceBetween>
                          )
                        }
                      </div>
                      <div className="bg-warning mt-3 p-1 rounded-1 text-center">
                        <IonIcon icon={chevronForwardOutline} />
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))
              ) : (
                <div className="text-center text-muted">
                  <big>No Apartment Yet</big> <br />
                  <small>
                    <i>Click on the "Add Apartment" to get started</i>
                  </small>
                </div>
              )}
            </section>
          </section>
        ) : (
          <section className="ion-padding">
            <IonSkeletonText
              animated
              className="w-100 rounded-3 mt-3"
              style={LoadingSkeletonStyles}
            />
            <IonSkeletonText
              animated
              className="w-100 rounded-3 mt-3"
              style={LoadingSkeletonStyles}
            />
            <IonSkeletonText
              animated
              className="w-100 rounded-3 mt-3"
              style={LoadingSkeletonStyles}
            />
            <IonSkeletonText
              animated
              className="w-100 rounded-3 mt-3"
              style={LoadingSkeletonStyles}
            />
            <IonSkeletonText
              animated
              className="w-100 rounded-3 mt-3"
              style={LoadingSkeletonStyles}
            />
          </section>
        )}
      </IonContent>
    </IonPage>
  );
};

const LoadingSkeletonStyles = {
  height: "150px",
};

export default Appartments;
