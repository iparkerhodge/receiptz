import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Platform } from 'react-native'
import { t } from 'react-native-tailwindcss'
import Constants from 'expo-constants'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

if (Constants.manifest) {
    Constants.manifest.originalFullName = '@account/project_name'
}

const api = Constants.manifest?.extra?.apiBaseUrl

const useProxy = Platform.select({ web: false, default: true })

// Web only: This method should be invoked on the page that 
// the auth popup gets redirected to on web, it'll ensure that 
// authentication is completed properly. On native this does nothing.
// WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
    tokenEndpoint: "https://twitter.com/i/oauth2/token",
    revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
}

const Account = () => {
    const [code, setCode] = useState('')
    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: 'c1cyWWlWR19la1d1X2FoSk5qSXA6MTpjaQ',
            redirectUri: AuthSession.makeRedirectUri({
                scheme: 'receiptz',
                useProxy: false,
                projectNameForProxy: '@parkerhodge/receiptz'
            }),
            usePKCE: true,
            scopes: [
                "tweet.read",
            ],
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            setCode(code)
        }
    }, [response])

    useEffect(() => {
    }, [code])






    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setConfirmation] = useState('')

    // TO DO: Add error handling

    return (
        <View style={[t.bgWhite, t.hFull, t.itemsCenter]}>
            <View>
                {/* {user
                    ? <Text>{user.email}</Text>
                    : <Text>no user is logged in</Text>
                } */}
            </View>
            <View style={[t.bgGray400, t.w3_4, t.flex, t.itemsCenter, t.mT10, t.pY3]}>
                <Text>Sign Up</Text>
                <View style={[t.w3_4, t.mT3]}>
                    <TextInput
                        placeholder='Email'
                        style={[t.bgWhite, t.pX1, t.rounded, t.pY1, t.mY1]}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        style={[t.bgWhite, t.pX1, t.rounded, t.pY1, t.mY1]}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        placeholder='Password Confirmation'
                        secureTextEntry={true}
                        style={[t.bgWhite, t.pX1, t.rounded, t.pY1, t.mY1]}
                        onChangeText={setConfirmation}
                    />
                    <View style={[t.mT2]}>
                        <Button title='Submit' />
                    </View>
                </View>
            </View>
            <View>
                <Button title='Sign up with Twitter'
                    onPress={() => {
                        promptAsync({ useProxy: false });
                    }}
                />
            </View>
        </View>
    )
}
export default Account