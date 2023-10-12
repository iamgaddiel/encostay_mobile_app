import { format } from "date-fns";
import { ApartementItem, ApartementList } from "../@types/apartments";
import { BookingItem, BookingList } from "../@types/bookings";
import { UserCollectionType } from "../@types/users";
import { getApiCollectionItem, listApiCollection } from "./apiHelpers";
import { APARTMENTS_COLLECTION, BOOKINGS_COLLECTION, USER } from "./keys";
import { HumanReadableDate, ServerLogPayload } from "../@types/utils";
import Settings from "./settings";
import { _post } from "./api";
import { getSaveData } from "./storageSDKs";





export function getHumanReadableDate(date: Date): HumanReadableDate {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const day = date.getDate();
  const weekday = daysOfWeek[date.getDay()];
  const monthAbbreviation = monthAbbreviations[date.getMonth()];
  const monthIndexString = monthNumbers[date.getMonth()];

  return {
    day,
    weekday,
    monthAbbreviation,
    monthIndexString
  };
}



export function getDateDiffInDays(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime()); // Get the absolute difference in milliseconds
  const diffInDays = Math.floor(diffInMilliseconds / oneDay); // Convert milliseconds to days

  return diffInDays;
}


export function getRandomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}


export function formatDate(date: string) {
  const formatedDated = format(new Date(date), 'LLL dd') // Month 01
  return formatedDated
}


export function getTimeOrDateFromDateTimeString(datetimeString: string, getDate?: boolean): string {
  const splitedDateTime = datetimeString.split('T')
  const date = splitedDateTime[0]
  const time = splitedDateTime[1]

  if (getDate) return date;
  return time
}



export async function serverLog(payload: ServerLogPayload): Promise<void> {
  const { serverBaseUrl } = Settings()
  const user = await getSaveData(USER)

  const newPayload = {user: user, ...payload}

  const url = `${serverBaseUrl}/util/logger`
  const headers = {'Content-Type': 'application/json'}
  await _post(url, newPayload, headers)
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

export async function getBookings(userId: string, authToken: string, accountType: 'guest' | 'host'): Promise<BookingList> {
  let params = {}

  if (accountType === 'guest') {
    params = {
      filter: `(guest="${userId}")`,
      expand: `apartment`,
      sort: '-created'
    };
  }

  if (accountType === 'host') {
    params = {
      filter: `(host="${userId}")`,
      expand: `apartment`,
      sort: '-created'
    };
  }

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
export async function getBookingDetail(bookingId: string, authToken: string): Promise<BookingItem | any> {
  //TODO: make this function a method of a class
  const params = {
    expand: `apartment`
  };
  const { response, error } = await getApiCollectionItem(
    BOOKINGS_COLLECTION,
    bookingId,
    authToken,
    params
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

export async function listApartments(authToken: string, params?: {}): Promise<ApartementList> { //

  const { data } = await listApiCollection(
    APARTMENTS_COLLECTION,
    authToken,
    params
  );
  const aprtments = data as ApartementList;
  console.log("🚀 ~ file: utils.ts:123 ~ listApartments ~ aprtments:", aprtments)
  if (data === undefined) {
    throw new Error("Could Not Fetch Data")
  }
  return aprtments
}