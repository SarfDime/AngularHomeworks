import { Timestamp } from '@angular/fire/firestore'

export interface RawPosts {
    description: string
    title: string
    upvotes: number
    downvotes: number
    timeStamp: Timestamp
    id: string
}

export interface Posts {
    description: string
    title: string
    upvotes: number
    downvotes: number
    timeStamp: Date
    id: string
}
