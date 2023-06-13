import React, { createContext, useEffect, useState } from 'react'
import { User } from '../types/types'
import { getUser, isUserSignedUp, storeUser } from '../helpers/users'

export interface UserContext {
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    userExists: boolean
}

export const UserContext = createContext<UserContext | null>(null)

interface UserProviderProps {
    children?: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>()
    const [userExists, setUserExists] = useState(false)

    useEffect(() => {
        if (user) {
            const storeInSecureStorage = async () => {
                await storeUser(user)
                setUserExists(true)
            }
            // when a user signs up, store in Secure Storage
            storeInSecureStorage()
        }
        else {
            // otherwise check if a user is already in Secure Storage
            // if no user is store, leave undefined
            const checkIfUserIsSignedUp = async () => {
                const id = await isUserSignedUp()
                if (id) {
                    setUserExists(true)
                    const storedUser = await getUser()
                    if (storedUser) {
                        setUser(storedUser)
                    }
                }
            }
            checkIfUserIsSignedUp()
        }

    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, userExists }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider