import { atom } from "recoil"
import RoomLnd from "../assets/images/room-ld.png"



interface Room{
    img: string
    id: number
    title: string
    location: string
    bedroom_nuber: number
    has_wifi: boolean
    price: string
    isFavourite: boolean
}

const appartment = [
    {
        img: RoomLnd,
        id: 0,
        title: "Marvine House",
        location: "Lagos, Nigeria",
        bedroom_nuber: 3,
        has_wifi: true,
        price: "$300.43",
        isFavourite: true
    },
    {
        img: RoomLnd,
        id: 0,
        title: "Marvine House",
        location: "Lagos, Nigeria",
        bedroom_nuber: 3,
        has_wifi: true,
        price: "$300.43",
        isFavourite: false
    },
    {
        img: RoomLnd,
        id: 0,
        title: "Marvine House",
        location: "Lagos, Nigeria",
        bedroom_nuber: 3,
        has_wifi: true,
        price: "$300.43",
        isFavourite: false
    },
    {
        img: RoomLnd,
        id: 0,
        title: "Marvine House",
        location: "Lagos, Nigeria",
        bedroom_nuber: 3,
        has_wifi: true,
        price: "$300.43",
        isFavourite: false
    },
]
export const demoRoomsAtom = atom({
    key: 'Rooms',
    default: appartment
})