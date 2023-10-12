import { Prettify } from "./utils"



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


export interface BankList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: BankItem[]
}



type BaseBankFields = {
    bank_name: string
    account_number: string
    account_name: string
}


export type NairaAccountFields = Prettify<BaseBankFields & {
    bvn: string
}>

export type DollarAccountFields = Prettify<BaseBankFields & {
    social_security_number: string
    address: string
    routing_number: string
}>

export type BankFields = NairaAccountFields | DollarAccountFields

