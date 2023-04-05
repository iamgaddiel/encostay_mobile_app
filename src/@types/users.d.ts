export type CreateUserType = {
    email: string
    password: string
    passwordConfirm: string
    name: string,
    mat_no?: string,
    staff_id?: string
    avatar?: string
    role?: string
    username: string
}

export type UserCollectionType = {
    staff_id?: string
    id: string
    collectionId: string
    role?: string
    collectionName: string
    created; string
    updated: string
    username?: string
    verified: boolean
    emailVisibility: boolean,
    email: string
    name: string
    avatar: string
    mat_no: string
}

interface StoredUser {
    record: UserCollectionType
    token: string
}