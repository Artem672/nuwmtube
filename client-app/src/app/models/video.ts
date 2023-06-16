import {Profile} from "./profile";

export interface Video {
    id: string
    name: string
    userId: string
    date: Date
    locationSrc: string
    publicId: string
    fileName: string
    profile: Profile
}