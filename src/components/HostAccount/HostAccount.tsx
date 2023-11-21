import {
  IonAvatar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  bedOutline,
  chevronForwardOutline,
  pencil,
  scaleOutline,
  shieldOutline,
  tvOutline,
  wifiOutline,
} from "ionicons/icons";
import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import SpaceBetween from "../style/SpaceBetween";
import Slider from "react-slick";

// images
import Pana from "../../assets/images/pana.svg";
import Card from "../../assets/images/view_ernings.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { demoRoomsAtom } from "../../atoms/demoAtoms";
import { utilsAtom } from "../../atoms/utilityAtom";
import { StoredUser } from "../../@types/users";
import { userAtom } from "../../atoms/appAtom";
import { ApartementList } from "../../@types/apartments";
import { listApiCollection } from "../../helpers/apiHelpers";
import { APARTMENTS_COLLECTION } from "../../helpers/keys";
import { useQuery } from "@tanstack/react-query";
import ProfileImage from "../ProfileImage";





const HostAccount = () => {
  const router = useIonRouter()

  // ----------------- Couresel Settings -----------------------
  const cardCarouselSettings = {
    dots: true,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerView: 1.5,
    speed: 2000,
    rtl: false,
    autoplay: false,
  };

  const setShowTabs = useSetRecoilState(utilsAtom);
  const { record: user, token } = useRecoilValue<StoredUser>(userAtom);


  const { data: apartmentList, isLoading } = useQuery({
    queryKey: ['hostHomeListing'],
    queryFn: getHostApartments
  })



  useIonViewDidEnter(() => {
    setShowTabs({ showTabs: true });
  }, []);





  async function getHostApartments() {

    const params = {
      filter: `host="${user.id}"`
    }
    const { data } = await listApiCollection(APARTMENTS_COLLECTION, token, params);
    const apartments = data as ApartementList;
    return apartments
  }

  return (
    <>
      {/* Side Menu */}
      <SideMenu user={user} />

      {/* Man Page */}
      <IonPage id="main-content">
        {/* Header */}
        <IonHeader className="ion-no-border">
          <IonToolbar className="p-2">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>

            <IonTitle>
              <small>Welcome, {user?.name}</small>
            </IonTitle>
            
            <ProfileImage slot={'end'} height={50} width={50} />
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/*  */}
          <section className="mb-4 py-2 border-bottom border-top d-flex align-items-center justify-content-between ">
            <div className="w-75">
              <big className="fs-5">
                Make Fortune <br /> Hosting Guest.
              </big>
              <IonLabel
                className="block mt-3 text-muted"
                style={{ fontSize: "14px" }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
                eius?
              </IonLabel>
            </div>
            <IonImg src={Pana} className="w-75 ml-3" />
          </section>

          {/* View Earnings */}
          <section
            className="my-5 shadow rounded-4 view_earnings ion-padding"
            style={{ backgroundImage: `url(${Card})` }}
            onClick={() => router.push('/transactions')}
          ></section>

          {/* Add New Listing */}
          <IonCard
            className="yellow_fill my-5 mx-0"
            mode="ios"
            style={{ backgroundColor: "var(--white-4)" }}
            routerDirection="forward"
            routerLink="/add_apartment"
          >
            <IonCardContent className="p-3">
              <SpaceBetween>
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center ion-padding"
                  style={{
                    width: "100px",
                    height: "80px",
                    backgroundColor: "var(--text-color2)",
                  }}
                >
                  <IonIcon icon={pencil} size="large" color="warning" />
                </div>

                <div className="ml-4">
                  <strong>Add New Listing</strong>
                  <small className="block mt-1 text-muted">
                    Add new listing to accommodate more guests
                  </small>
                </div>
              </SpaceBetween>
            </IonCardContent>
          </IonCard>

          {/* Apartments  */}
          {/* <IonList>
            <IonListHeader>
              <IonTitle className="block ion-no-margin ion-no-padding">Apartements</IonTitle>
              <IonRouterLink
                routerDirection="forward"
                routerLink="/appartments"
              >
                <IonIcon
                  className="block"
                  icon={chevronForwardOutline}
                  color="dark"
                />
              </IonRouterLink>
            </IonListHeader>

            {apartmentList?.totalItems > 0
              ? apartmentList?.items.splice(0, 4).map((apartment) => (
                  <IonItem
                    lines="none"
                    routerDirection="forward"
                    routerLink="#"
                    mode="ios"
                  >
                    <IonLabel>
                      <h2>{apartment.title}</h2>
                      <p>{apartment.description}</p>
                    </IonLabel>
                  </IonItem>
                ))
              : null}
          </IonList> */}

          {/* Most Rated Listing */}
          <section className="home_list">
            <section className="mt-4">
              { }
              <SpaceBetween>
                <big>Recent Listing</big>

                <div className='d-flex align-items-center text-muted'>
                  <IonRouterLink
                    routerDirection="forward"
                    routerLink="/apartments"
                    className="text-muted"
                  >
                    View all
                  </IonRouterLink>
                  <IonIcon icon={chevronForwardOutline} slot='end' />
                </div>
              </SpaceBetween>
            </section>
            <Slider {...cardCarouselSettings}>
              {apartmentList?.items.slice(0, 4).map((home, indx) => (
                <IonCard
                  color={"light"}
                  className="p-2 home_list_card p-3"
                  key={indx}
                >
                  {/* <IonIcon
                    icon={heart}
                    className={`home_list_card_fav_icon text-${
                      home.isFavourite ? "warning" : "light"
                    }`}
                    size="large"
                  /> */}
                  <div
                    className="home_list_item_img_wrapper"
                    // style={{ backgroundImage: `url(${home.img})` }}
                  ></div>

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
                            <span className="ms-1">Secuirty</span>
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
              ))}
            </Slider>
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HostAccount;
