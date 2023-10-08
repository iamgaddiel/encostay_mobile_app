export interface AppConfig{
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    app_name: string
    service_charge: number
    website: string
    app_lang: string
    app_currency: string
    flw_test_pk: string
    flw_test_sk: string
    flw_test_ek: string
    flw_live_pk: string
    flw_live_sk: string
    flw_live_ek: string
    strp_test_pk: string
    strp_test_sk: string
    strp_live_pk: string
    strp_live_sk: string
}


export interface AppConfigList{
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: AppConfig[]
  }