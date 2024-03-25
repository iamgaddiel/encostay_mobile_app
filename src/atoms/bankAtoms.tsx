import { atom } from "recoil";



export const BankSelectAtom = atom<{ id: string, name: string }>({
    key: 'SELECTED_NAIRA_BANK',
    default: {
        id: '',
        name: ''
    }
})

