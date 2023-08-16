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
} from "ionicons/icons";
import { useRecoilValue } from "recoil";
import SpaceBetween from "../../components/style/SpaceBetween";
import { userAtom } from "../../atoms/appAtom";
import { getHostApartments } from "../../helpers/utils";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/NotFound/NotFound";

const Appartments = () => {
  const {token: authToken, record } = useRecoilValue(userAtom);
  const hostId = record.id

  // const [apartmentList, setApartmentList] = useState<ApartementList | null>(
  //   null
  // );


  //FIXME: remove the error on queryKey
  const { data: apartmentList, isLoading, error} = useQuery({ 
    queryKey: ['hostApartmentList', hostId, authToken],
    queryFn:  getHostApartments(hostId, authToken)
  })
  console.log("🚀 ~ file: Appartments.tsx:51 ~ Appartments ~ apartmentList:", apartmentList)
  
  
  // useEffect(() => {
  //   loadHostApartements();
  // }, []);
  
  // // TODO: use ReactQuery for fetching data from database.
  // const rooms = useRecoilValue(demoRoomsAtom);


  // async function loadHostApartements() {
  //   const apartments = await getHostApartments(user.record.id, user.token)
  //   setApartmentList(apartments)
  //   setIsLoading(() => false)
  // }

  // async function getHostApartments(hostId: string, authToken: string) { //
  //   const params = {
  //     filter: `(host="${hostId}")`,
  //   };
  //   const { data } = await listApiCollection(
  //     APARTMENTS_COLLECTION,
  //     authToken,
  //     params
  //   );
  //   const aprtments = data as ApartementList;
  //   console.log("🚀 ~ file: Appartments.tsx:79 ~ getHostApartments ~ aprtments:", aprtments)
  //   return aprtments
  //   // setApartmentList(aprtments);
  //   // setIsLoading(() => false)
  // }

  if (error){
    return <NotFound heading="Error" subheading="Could Not Try Again" />
  }

  return (
    <IonPage>
      <BackHeader backLink="/home" title="My Apartments" />
      <IonContent className="ion-padding" fullscreen>
        {!isLoading ? (
          <section className="home_list">
            <section className="mt-4">
              {}
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
                          <span className="text-muted">{home.address}</span>
                        </div>
                        <div>
                          <span className="text-muted">
                            <big className="text-warning ">
                              {home.max_nights}
                            </big>
                            / Day
                          </span>
                        </div>
                      </div>

                      <div className="home_list_card_info mt-3">
                        <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                          <IonIcon icon={bedOutline} size="large" />
                          <span style={{ marginLeft: "7px" }}>
                            {home.bedrooms} Bedroom
                          </span>
                        </SpaceBetween>

                        {home.has_gym && (
                          <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                            <IonIcon icon={codeWorkingOutline} size="large" />
                          </SpaceBetween>
                        )}

                        <SpaceBetween className="muted-outline px-2 py-1 rounded-4 fw-bold">
                          <IonIcon icon={wifiOutline} size="large" />
                          <span style={{ marginLeft: "7px" }}>
                            {home.has_wifi} Wifi
                          </span>
                        </SpaceBetween>

                        <div className="bg-warning d-flex justify-content-center align-items-center p-1 rounded-1">
                          <IonIcon icon={chevronForwardOutline} />
                        </div>
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
