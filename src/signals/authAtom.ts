import { useSignal } from "@preact/signals-react";



export interface Registration{
    first_name: string
    last_name: string
    email: string
    birthday: string
    password: string
    account_type: string
}


export const registrationSignal = useSignal<Registration>({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    password: "",
    account_type: ""
})

