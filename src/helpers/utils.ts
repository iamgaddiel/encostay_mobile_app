import { UserCollectionType } from "../@types/users";

export function getRandomString(length: number) {
    return (Math.random() + 1).toString(36).substring(length);
}


export function getUserSchoolId(user: UserCollectionType ,role: string){
    switch (role){
        case "student":
            return user?.mat_no

        case "staff":
            return user?.staff_id
    }
}

