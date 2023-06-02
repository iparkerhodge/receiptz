import React, { createContext, useEffect, useState } from 'react'
import { User } from '../types/types'
import { getUser, storeUser } from '../helpers/users'

export interface UserContext {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = createContext<UserContext | null>(null)

interface UserProviderProps {
    children?: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        if (user) {
            const storeInAsyncStorage = async () => await storeUser(user)
            // when a user signs up, store in AsyncStorage
            storeInAsyncStorage()
        }
        else {
            // otherwise check if a user is already in AsyncStorage
            // if no user is store, leave undefined
            const checkForStoredUser = async () => {
                const storedUser = await getUser()
                if (storedUser) {
                    setUser(storedUser)
                }
            }
            checkForStoredUser()
        }

    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider