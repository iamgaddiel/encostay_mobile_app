


export interface WalletItem{
    id: string
    collectionId: string
    collectionName: string
    created; string
    updated: string
    host: string
    balance: number
}


export interface WalletList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: WalletItem[]
}
