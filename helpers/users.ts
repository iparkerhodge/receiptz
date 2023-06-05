import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';

export const storeUser = async (user: User) => {
    try {
        // @user determines login status
        await AsyncStorage.setItem('@user', JSON.stringify(user))
        // @account persists after a user logs out to verify if the
        // user has an existing account
        const account = {
            user_id: user.id,
            refreshToken: user.refreshToken // used when logging back in & when access_token expires
        }
        await AsyncStorage.setItem('@account', JSON.stringify(account))
    } catch (e) {
        throw new Error(`Unable to save user with AsyncStorage: ${e}`)
    }
}

export const isUserSignedUp = async (): Promise<number | null> => {
    try {
        const val = await AsyncStorage.getItem('@account')
        if (val !== null) {
            const account = JSON.parse(val)
            return account.user_id
        } else {
            return null
        }
    } catch (e) {
        throw new Error(`Unable to check if user is signed up: ${e}`)
    }
}

export const getAccount = async () => {
    const val = await AsyncStorage.getItem('@account')
    if (val) {
        const account = JSON.parse(val)
        return account
    }
}

export const getRefreshToken = async () => {
    const account = await getAccount()
    const refreshToken = account?.refreshToken
    if (refreshToken) {
        return refreshToken
    }
}

export const getUser = async (): Promise<User | undefined> => {
    try {
        let user: User | undefined
        const value = await AsyncStorage.getItem('@user')
        if (value !== null) {
            user = JSON.parse(value)
        } else {
            user = undefined
        }
        return user
    } catch (e) {
        throw new Error(`Unable to retrieve user from AsyncStorage: ${e}`)
    }
}

export const signOut = async () => {
    try {
        await AsyncStorage.removeItem('@user')
    } catch (e) {
        throw new Error(`Unable to logout user: ${e}`)
    }
}