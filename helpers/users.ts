import * as SecureStore from 'expo-secure-store';
import { User } from '../types/types';

export const storeUser = async (user: User) => {
    try {
        // current_user determines login status
        await SecureStore.setItemAsync('current_user', JSON.stringify(user))
        // account persists after a user logs out to verify if the
        // user has an existing account
        const account = {
            user_id: user.id,
            refreshToken: user.refreshToken // used when logging back in & when access_token expires
        }
        await SecureStore.setItemAsync('account', JSON.stringify(account))
    } catch (e) {
        throw new Error(`Unable to save user: ${e}`)
    }
}

export const isUserSignedUp = async (): Promise<number | null> => {
    try {
        const val = await SecureStore.getItemAsync('account')
        if (val !== null) {
            const account = JSON.parse(val)
            if (account.user_id > 0)
                return account.user_id
            else {
                throw new Error(`Unable to check if user is signed up: error retrieving user_id from storage`)
            }
        } else {
            return null
        }
    } catch (e) {
        throw new Error(`Unable to check if user is signed up: ${e}`)
    }
}

export const getAccount = async () => {
    const val = await SecureStore.getItemAsync('account')
    if (val) {
        const account = JSON.parse(val)
        return account
    }
}

export const getRefreshToken = async () => {
    try {
        const account = await getAccount()
        const refreshToken = account?.refreshToken
        if (refreshToken) {
            return refreshToken
        }
    }
    catch (e) {
        throw new Error(`Unable to retrieve token: ${e}`)
    }
}

export const getUser = async (): Promise<User | undefined> => {
    try {
        let user: User | undefined
        const value = await SecureStore.getItemAsync('current_user')
        if (value !== null) {
            user = JSON.parse(value)
        } else {
            user = undefined
        }
        return user
    } catch (e) {
        throw new Error(`Unable to retrieve user from storage: ${e}`)
    }
}

export const signOut = async () => {
    try {
        await SecureStore.deleteItemAsync('current_user')
    } catch (e) {
        throw new Error(`Unable to logout user: ${e}`)
    }
}