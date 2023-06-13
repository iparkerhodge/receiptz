export interface User {
    id: number
    twitterId: string
    twitterUsername: string
    twitterName: string
    twitterProfileImage?: string
    accessToken: string
    accessTokenIssuedAt: string
    refreshToken: string
    receiptzToken: string
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