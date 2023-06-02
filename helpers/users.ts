import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/types';

export const storeUser = async (user: User) => {
    try {
        await AsyncStorage.setItem('@user', JSON.stringify(user))
    } catch (e) {
        throw new Error(`Unable to save user with AsyncStorage: ${e}`)
    }
}

export const getUser = async (): Promise<User | undefined> => {
    try {
        let user: User | undefined
        const value = await AsyncStorage.getItem('@user')
        if (value !== null) {
            // value previously stored
            user = JSON.parse(value)
        } else {
            user = undefined
        }
        return user
    } catch (e) {
        // error reading value
        throw new Error(`Unable to retrieve user from AsyncStorage: ${e}`)
    }
}