export interface RegistrationInputs{
    first_name: string
    last_name: string
    email: string
    password: string
    passwordConfirm: string
    name?: string
    account_type: string
    birthday: string
    phone: string
}


export interface LoginInputs{
    email: string
    password: string
}

