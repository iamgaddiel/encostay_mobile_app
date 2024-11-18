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








export function getBase64Details(base64Data: string): { filetype: string, mimeType: string, base64Data: string } {
  const base64Extract = base64Data.match(/^data:(.*);base64,/)!;
  const mimeType = base64Extract[1]
  const filetype = base64Extract[1].split('/')[1];
  return { filetype, mimeType, base64Data }
}


export async function base64ToFile(base64: string, filename: string, mimeType: string): Promise<File> {
  const response = await fetch(base64);
  const blob = await response.blob();

  // Create a File from Blob
  const file: File = new File([blob], filename, { type: mimeType });
  return file
}

export async function base64ToUint8Array(base64: string): Promise<Uint8Array> {
  const response = await fetch(base64);
  const blob = await response.blob();
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as ArrayBuffer);
      reader.readAsArrayBuffer(blob);
  });

  return new Uint8Array(arrayBuffer);
}


export function uint8ArrayToFile(uint8Array: Uint8Array, fileName: string, mimeType: string): File {
  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: mimeType });

  // Use the Blob to create a File object
  const file = new File([blob], fileName, { type: mimeType });
  return file;
}



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

export function generateRandomNumbers(length: number) {
  let result = '';
  const characters = '0123456789'; // All possible numeric characters

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
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

  const newPayload = { user: user, ...payload }

  const url = `${serverBaseUrl}/util/logger`
  const headers = { 'Content-Type': 'application/json' }
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

//FIXME: Api Rule: only admin, host, guest related to a booking can view
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