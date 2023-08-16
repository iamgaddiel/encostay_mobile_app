import ImageKit from "imagekit";
import { atom } from "recoil";



export const imageKitAtom = atom<ImageKit | null>({
    key: "IMAGEKIT",
    default: null
})