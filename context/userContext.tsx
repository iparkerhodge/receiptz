import React, { createContext, useState } from 'react'
import { User } from '../types/types'

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

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider