import {Profile} from "./profile";

export interface Video {
    id: string
    name: string
    userId: string
    date: Date
    fileName: string
    profile: Profile
}