import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Platform, TouchableOpacity } from 'react-native'
import { t } from 'react-native-tailwindcss'
import Constants from 'expo-constants'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';
import { UserContext } from '../context/userContext'
import TwitterProfile from '../components/account/TwitterProfile'
import useTwitterAuth from '../hooks/auth/useTwitterAuth'
import { getRefreshToken, signOut } from '../helpers/users'
import AsyncStorage from '@react-native-async-storage/async-storage'

if (Constants.manifest) {
    Constants.manifest.originalFullName = '@account/project_name'
}

const api = `http://127.0.0.1:3000`

WebBrowser.maybeCompleteAuthSession()


const Account = () => {
    const { user, setUser, userExists } = useContext(UserContext) as UserContext
    const [signUp, token, error, setError] = useTwitterAuth()

    // dev only; remove this later
    const clear = async () => {
        await AsyncStorage.removeItem('@user')
        await AsyncStorage.removeItem('@account')
    }

    const logout = async () => {
        await signOut()
        setUser(undefined)
    }

    const login = async () => {
        const refreshToken = await getRefreshToken()
        const res = await axios.post(`${api}/login`, { token: { refreshToken: refreshToken } })
        const user = res.data
        setUser(user)
    }

    useEffect(() => {
        // if acces token request was successful
        if (token && !userExists) {
            // create the user
            const createUser = async () => {
                try {
                    const res = await axios.post(`${api}/sign_up`, { token: token })
                    const user = res.data
                    setUser(user)
                    setError(false)
                } catch (e) {
                    setError(true)
                    throw new Error('there was a problem creating your account')
                }
            }

            createUser()
        }
    }, [token])

    return (
        <View style={[t.bgBlack, t.hFull, t.itemsCenter]}>
            <View>
                {user &&
                    <TwitterProfile user={user} />
                }
                {user &&
                    <View style={[t.mT4, t.border2, t.borderWhite, t.rounded]}>
                        <TouchableOpacity style={[t.flex, t.itemsCenter]} onPress={logout}>
                            <Text style={[t.textWhite, t.fontBold, t.pY2]}>Log me out 👋</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View>
                {error &&
                    <Text>There was an error signing you up. Please try again</Text>
                }
            </View>
            {user === undefined
                && (
                    userExists
                        ? <View style={[t.mT4, t.border2, t.borderWhite, t.rounded]}>
                            < TouchableOpacity style={[t.flex, t.itemsCenter]} onPress={login}>
                                <Text style={[t.textWhite, t.fontBold, t.pY2, t.pX4]}>Log in with Twitter 🐦</Text>
                            </TouchableOpacity>
                        </View >
                        : <View style={[t.mT4, t.border2, t.borderWhite, t.rounded]}>
                            <TouchableOpacity style={[t.flex, t.itemsCenter]} onPress={signUp}>
                                <Text style={[t.textWhite, t.fontBold, t.pY2, t.pX4]}>Sign up with Twitter 🐦</Text>
                            </TouchableOpacity>
                        </View>
                )
            }
        </View >
    )
}
export default Account