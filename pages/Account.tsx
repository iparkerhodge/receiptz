import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { t } from 'react-native-tailwindcss'
import Constants from 'expo-constants'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { signOut } from '../helpers/users'
import * as SecureStore from 'expo-secure-store';
import SignUpForm from '../components/account/SignUpForm'

if (Constants.manifest) {
    Constants.manifest.originalFullName = '@account/project_name'
}

const api = `http://127.0.0.1:3000`

const Account = () => {
    const { user, setUser, userStatus } = useContext(UserContext) as UserContext

    // dev only; remove this later
    const clear = async () => {
        await SecureStore.deleteItemAsync('current_user')
        await SecureStore.deleteItemAsync('account')
    }

    const logout = async () => {
        await signOut()
        setUser(undefined)
    }

    const submitSignUp = async (data: { name: string, password: string, mobileNumber: string }) => {
        const res = await axios.post(`${api}/sign_up`, data)
        setUser(res.data)
    }

    return (
        <View style={[t.bgBlack, t.hFull, t.itemsCenter]}>
            <View style={[t.w1_2]}>
                <SignUpForm onSubmit={submitSignUp} />
            </View>
        </View >
    )
}
export default Account