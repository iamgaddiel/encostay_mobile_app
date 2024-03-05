import { ApartementItem } from "./apartments"
import { UserCollectionType } from "./users"


export type ReviewItem = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    user: string
    stars: 1 | 2 | 3 | 4 | 5
    comment: StripeIssuingCardCopyButtonElement
    apartment: string
    expand?: {
      apartment?: ApartementItem
      user?: UserCollectionType
    }
  }

export interface ReviewList{
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: ReviewItem []
  }