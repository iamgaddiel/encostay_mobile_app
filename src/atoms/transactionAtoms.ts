import { atom } from "recoil";


export const flutterwaveTransactionIDAtom = atom({
    key: 'FLUTTERWAVE_TRANSACTION_ID',
    default: {
        transactionId: 0,
        collectionId: ''
    }
})