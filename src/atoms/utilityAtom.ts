import { atom } from "recoil"


interface UtilAtom {
    showTabs: boolean
}


export const utilsAtom = atom<UtilAtom>({
    key: "UTILITY",
    default: {
        showTabs: true
    }
})