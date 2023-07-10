export interface User {
    id: number
    name: string
    mobile_number: string
    receiptzToken: string
}

export enum UserStatus {
    NOT_EXISTS = 'not_exists',
    EXISTS = 'exists',
    SIGNED_IN = 'signed_in'
}

export interface Receipt {
    id: number
    title: string
    accusee: string
    claims: string[]
    collectionDate: Date
    imageUrl?: string
    userId: number
    createdAt: Date
}