
type AccountType = "host" | "guest"

export interface UserCollectionType {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    username?: string
    verified: boolean
    emailVisibility: boolean,
    email: string
    name: string
    avatar: string
    account_type: AccountType
    is_disabled: boolean
    report_count: number
    preferred_currency: 'NGN' | 'USD'
    phone: string
    profile_image_url: string
}

interface StoredUser {
    record: UserCollectionType
    token: string
}

export interface UsersList{
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: UserCollectionType[]
}