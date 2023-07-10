import * as SecureStore from 'expo-secure-store';
import { User, UserStatus } from '../types/types';
import axios from 'axios';

const api = `http://127.0.0.1:3000`

export const storeUser = async (user: User) => {
    try {
        // current_user determines login status
        await SecureStore.setItemAsync('current_user', JSON.stringify(user))
        // account persists after a user logs out to verify if the
        // user has an existing account
        const account = {
            userId: user.id,
            receiptzToken: user.receiptzToken
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

export const checkUserStatus = async (): Promise<UserStatus> => {
    const acct = await getAccount()

    if (acct || !acct.userId) {
        return UserStatus.NOT_EXISTS
    }
    else if (acct && !acct.receiptzToken) {
        return UserStatus.EXISTS
    }
    else if (acct && acct.receiptzToken) {
        // check token status
        const headers = { 'Authorization': `Bearer ${acct.receiptzToken}` }
        const res = await axios.post(`${api}/users/status`, {}, { headers: headers })
        // if good return SIGNED_IN
        if (res.status === 200) {
            return UserStatus.SIGNED_IN
        }
        else {
            return UserStatus.EXISTS
        }
        // else return EXISTS
    }

    return UserStatus.NOT_EXISTS
}