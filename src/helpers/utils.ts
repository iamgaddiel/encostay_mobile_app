import { format } from "date-fns";
import { ApartementItem, ApartementList } from "../@types/apartments";
import { BookingItem, BookingList } from "../@types/bookings";
import { UserCollectionType } from "../@types/users";
import { getApiCollectionItem, listApiCollection } from "./apiHelpers";
import { APARTMENTS_COLLECTION, BOOKINGS_COLLECTION } from "./keys";


/**
 * 
 * @param length 
 * @returns 
 */
export function getRandomString(length: number) {
  return (Math.random() + 1).toString(36).substring(length);
}

/**
 * 
 * @param date 
 * @description returns formated date in this format <Month> <Day of the Month> E.g Aug 02 
 * @returns 
 */
export function formatDate(date: string) {
  const formatedDated = format(new Date(date), 'LLL dd') // Month 01
  return formatedDated
}

/**
 * 
 * @param datetimeString: string
 * @param getTime: string
 * @param getDate: string
 * @description returns time string by default except getDate parameter is set to true
 * @returns 
 */
export function getTimeOrDateFromDateTimeString(datetimeString: string, getDate?: boolean): string {
  const splitedDateTime = datetimeString.split('T')
  const date = splitedDateTime[0]
  const time = splitedDateTime[1]

  if (getDate) return date;
  return time
}


// ========================== Host Apartments =================================

//TODO: Add the following functions to a class

// TODO: pass the function to ReactQuery
export async function getHostApartments(hostId: string, authToken: string): Promise<ApartementList> { //
  const params = {
    filter: `(host="${hostId}")`,
  };
  const { data } = await listApiCollection(
    APARTMENTS_COLLECTION,
    authToken,
    params
  );
  const aprtments = data as ApartementList;
  console.log("🚀 ~ file: utils.ts:45 ~ getHostApartments ~ aprtments:", aprtments)
  if (data === undefined) {
    throw new Error("Could Not Fetch Data")
  }
  return aprtments
}

// TODO: pass the function to ReactQuery
export async function getApartmentDetail(apartmentId: string, authToken: string): Promise<ApartementItem | any> {
  //TODO: make this function a method of a class
  const { response, error } = await getApiCollectionItem(
    APARTMENTS_COLLECTION,
    apartmentId,
    authToken
  );
  if (error) {
    console.log(
      "🚀 ~ file: HostApartmentDetail.tsx:54 ~ getApartmentDetail ~ error:",
      error
    );
    return error
  }
  return response as ApartementItem
}


// ========================== Bookings =================================

export async function getBookings(userId: string, authToken: string): Promise<BookingList> {
  const params = {
    filter: `(guest="${userId}")`,
  };
  const { data } = await listApiCollection(
    BOOKINGS_COLLECTION,
    authToken,
    params
  );
  const bookings = data as BookingList;
  if (data === undefined) {
    throw new Error("Could Not Fetch Data")
  }
  return bookings
}

//FIXME: Api Rule: only admin, host, guest reated to a booking can view
export async function getBookingDetai(bookingId: string, authToken: string): Promise<BookingItem | any> {
  //TODO: make this function a method of a class
  const { response, error } = await getApiCollectionItem(
    BOOKINGS_COLLECTION,
    bookingId,
    authToken
  );
  if (error) {
    console.log(
      "🚀 ~ file: HostApartmentDetail.tsx:54 ~ getApartmentDetail ~ error:",
      error
    );
    return error
  }
  return response as BookingItem
}



// ========================== Apatments =================================

export async function listApartments(authToken: string): Promise<ApartementList> { //

  const { data } = await listApiCollection(
    APARTMENTS_COLLECTION,
    authToken,
  );
  const aprtments = data as ApartementList;
  console.log("🚀 ~ file: utils.ts:123 ~ listApartments ~ aprtments:", aprtments)
  if (data === undefined) {
    throw new Error("Could Not Fetch Data")
  }
  return aprtments
}