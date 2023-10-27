import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronBack, chevronForward, optionsOutline } from "ionicons/icons";
import { useState } from "react";
import SpaceBetween from "../../components/style/SpaceBetween";
import HomeListCard from "../../components/HomeListCard/HomeListCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { listApartments, serverLog } from "../../helpers/utils";
import RoomLnd from "../../assets/images/room-ld.png";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/NotFound";
import SekeletonLoadingFullWidth from "../../components/SekeletonLoadingFullWidth";
import { searchFilterAtom } from "../../atoms/apartmentAtom";



interface ApartmentSearchOptions { perPage: number, page: number, filter?: string }

const ApartmentSearchFilterResult = () => {
  const router = useIonRouter()

  const setToast = useIonToast

  const { token: authToken, record: user } = useRecoilValue(userAtom);

  const apartmentSearchFilterPrams = useRecoilValue(searchFilterAtom)

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
    // TODO: filter apartments according to stated filter parameters

    const { price_range, children_allowed, has_gym, has_laundry, has_security, has_tv_cable, has_wifi, party_allowed, pets_allowed, smoking_allowed } = apartmentSearchFilterPrams

    let filterString = ''

    if (price_range.max > 1000) {
      filterString = `${filterString}(price >= ${price_range.min} && price <= ${price_range.max}) && `
    }
    if (children_allowed) {
      filterString = `${filterString}(children_allowed = ${children_allowed}) &&`
    }
    if (has_gym) {
      filterString = `${filterString}(has_gym = ${has_gym}) &&`
    }
    if (has_laundry) {
      filterString = `${filterString}(has_laundry = ${has_laundry}) &&`
    }
    if (has_security) {
      filterString = `${filterString}(has_security = ${has_security}) &&`
    }
    if (has_security) {
      filterString = `${filterString}(has_security = ${has_security}) &&`
    }
    if (has_tv_cable) {
      filterString = `${filterString}(has_tv_cable = ${has_tv_cable}) &&`
    }
    if (has_wifi) {
      filterString = `${filterString}(has_wifi = ${has_wifi}) &&`
    }
    if (party_allowed) {
      filterString = `${filterString}(party_allowed = ${party_allowed}) &&`
    }
    if (pets_allowed) {
      filterString = `${filterString}(pets_allowed = ${pets_allowed}) &&`
    }
    if (smoking_allowed) {
      filterString = `${filterString}(smoking_allowed = ${smoking_allowed}) &&`
    }

    // Convert filterString to an array and remove the '&&'
    let filterStringArray: string[] = filterString.split(' ')

    filterStringArray.pop()

    // reassign the new string back to the filterString variable
    filterString = filterStringArray.reduce((prev, currentVal) => prev + ' ' + currentVal)
    console.log("🚀 ~ file: ApartmentSearchFilterResult.tsx:112 ~ fetchApartments ~ filterString:", filterString)


    try {
      let options: ApartmentSearchOptions = {
        perPage: 5,
        page,
        filter: filterString
      }
      if (title !== '') options = { perPage: 5, page, filter: `title="${title}"` };
      return await listApartments(authToken, options);
    }
    catch (err: any) {
      serverLog({
        errorMessage: 'There was an error fetching apartments',
        file: 'ApartmentSearchFilterResult.tsx',
        lineNumber: '73',
        user: user.id
      })
      throw new Error('There was an error getting apartments')
    }
  }




  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="ion-padding-end pr-2">
          <IonButtons slot="start">
            <IonBackButton mode='ios' defaultHref="/apartment_search_filter" />
          </IonButtons>
          <IonTitle>Apartment Search Result</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="10" sizeMd="11" sizeXs="10">
              <IonSearchbar className="ion-no-border home_search_bar" mode="ios" onKeyUp={(e) => setApartmentTitle(e.currentTarget.value as string)} />
            </IonCol>
            <IonCol size="auto" >
              <IonIcon color="warning" icon={optionsOutline} size="large" onClick={() => router.push('/apartment_search/filter')} />
            </IonCol>
          </IonRow>
        </IonGrid> */}

        {/* Apartment Count */}
        <section className="appartment_counter mt-3">
          <div className="my-3 text-muted">
            <span>{apartmentList?.totalItems}+ places to stay</span>
          </div>

          {
            isLoading ? (
              <SekeletonLoadingFullWidth count={4} height={20} width={100} />
            ) : (
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

export default ApartmentSearchFilterResult;
