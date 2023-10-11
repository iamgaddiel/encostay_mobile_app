


export interface BankItem {
    id: string
    collectionId: sting
    collectionName: string
    created: string
    updated: string
    user: string
    bank_name: string
    account_number: string
    account_name: string
    bvn: string
    social_security_number: string
    address: string
    routing_number: string
}

// export type AddBankFields 

// export interface AddBankFields Omit{
//     bank_name: string
//     account_number: string
//     account_name: string
// }

export interface NairaBankFields {
    bvn: string
}

export interface DollarBankFields extends AddBankFields{
    social_security_number: string
    address: string
    routing_number: string
}


export interface BankList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: BankItem[]
}
