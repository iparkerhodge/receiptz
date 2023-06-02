import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import { t } from 'react-native-tailwindcss'
import Constants from 'expo-constants'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { User } from '../types/types'
import { UserContext } from '../context/userContext'
import useTwitterSignUp from '../hooks/auth/useTwitterSignUp'

if (Constants.manifest) {
    Constants.manifest.originalFullName = '@account/project_name'
}

const api = `http://127.0.0.1:3000`

WebBrowser.maybeCompleteAuthSession()


const Account = () => {
    const { user, setUser } = useContext(UserContext) as UserContext
    const [sign_up, token, error] = useTwitterSignUp()

    useEffect(() => {
        // if acces token request was successful
        if (token) {
            // create the user
            const createUser = async () => {
                try {
                    const res = await axios.post(`${api}/sign_up`, { token: token })
                    const user = res.data
                    setUser(user)
                } catch (e) {
                    console.log(user)
                    throw new Error('there was a problem creating your account')
                }
            }

            createUser()
        }
    }, [token])

    return (
        <View style={[t.bgWhite, t.hFull, t.itemsCenter]}>
            <View>
                {user
                    ? <Text>{user.twitterUsername}</Text>
                    : <Text>no user is logged in</Text>
                }
            </View>
            <View>
                {error &&
                    <Text>There was an error signing you up. Please try again</Text>
                }
            </View>
            <View>
                {error &&
                    <Text>there was an error signing you in</Text>
                }
            </View>
            {user === undefined &&
                <View>
                    <Button title='Sign up with Twitter'
                        onPress={sign_up}
                    />
                </View>
            }
        </View >
    )
}
export default Account