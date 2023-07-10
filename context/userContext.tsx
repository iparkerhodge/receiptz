import React, { createContext, useEffect, useState } from 'react'
import { User, UserStatus } from '../types/types'
import { checkUserStatus, getUser, isUserSignedUp, storeUser } from '../helpers/users'

export interface UserContext {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    userStatus: UserStatus | undefined
}

export const UserContext = createContext<UserContext | null>(null)

interface UserProviderProps {
    children?: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>()
    const [userStatus, setUserStatus] = useState<UserStatus | undefined>()

    useEffect(() => {
        const checkStatus = async (): Promise<void> => {
            const status = await checkUserStatus()
            setUserStatus(status)
        }

        if (!user) {
            checkStatus()
        }
        else {
            const storeInSecureStorage = async () => {
                await storeUser(user)
                setUserStatus(UserStatus.SIGNED_IN)
            }
            // when a user signs up, store in Secure Storage
            storeInSecureStorage()
        }
    }, [user])

    useEffect(() => {
        if (userStatus === UserStatus.SIGNED_IN && !user) {
            const retrieveUser = async () => {
                const storedUser = await getUser()
                setUser(storedUser)
            }

            retrieveUser()
        }
    }, [userStatus])

    return (
        <UserContext.Provider value={{ user, setUser, userStatus }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider