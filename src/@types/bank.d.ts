

export interface AddBankFields{
    bank_name: string
    account_number: string
    bvn?: string
    bank_name: string
    account_name: string
}

export type BankItem = {
    id: string
    collectionId: sting
    collectionName: string
    created: string
    updated: string
    host: string
    bank_name: string
    account_number: string
    account_name: string
    bvn: string
}


export interface BankList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: BankItem[]
}
