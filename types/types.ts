export interface User {
    id: number
    twitterId: string
    twitterUsername: string
    twitterName: string
    twitterProfileImage?: string
    accessToken: string
    accessTokenIssuedAt: string
    refreshToken: string
}