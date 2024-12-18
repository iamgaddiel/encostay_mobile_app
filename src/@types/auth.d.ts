export interface RegistrationInputs{
    first_name: string
    last_name: string
    email: string
    password: string
    passwordConfirm: string
    name?: string
    account_type: 'guest' | 'host'
    birthday: string
    phone: string
    preferred_currency: 'NGN' | 'USD'
    emailVisibility?: boolean
}


export interface LoginInputs{
    email: string
    password: string
}

