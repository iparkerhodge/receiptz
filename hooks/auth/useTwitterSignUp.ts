import { useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';

const discovery = {
    authorizationEndpoint: "https://twitter.com/i/oauth2/authorize",
    tokenEndpoint: "https://api.twitter.com/2/oauth2/token",
    revocationEndpoint: "https://twitter.com/i/oauth2/revoke",
}

const config = {
    clientId: 'c1cyWWlWR19la1d1X2FoSk5qSXA6MTpjaQ',
    redirectUri: AuthSession.makeRedirectUri({
        scheme: 'receiptz',
        useProxy: false,
        projectNameForProxy: '@parkerhodge/receiptz'
    }),
    usePKCE: true,
    scopes: [
        "tweet.read users.read offline.access",
    ],
}

export type TwitterSignUpHook = [
    () => void,
    AuthSession.TokenResponse | undefined,
    boolean,
];

export default (): TwitterSignUpHook => {
    const [request, response, promptAsync] = AuthSession.useAuthRequest(config, discovery)
    const [token, setToken] = useState<AuthSession.TokenResponse | undefined>()
    const [error, setError] = useState(false)

    useEffect(() => {
        // if request for code is successful
        if (response?.type === 'success' && request) {
            // get the access token
            const fetchAccessToken = async () => {
                const tokenResult = await AuthSession.exchangeCodeAsync({
                    ...config,
                    code: response?.params.code,
                    extraParams: {
                        code_verifier: request?.codeVerifier as string,
                        grantType: 'authorization_code',
                    }
                }, discovery)
                if (tokenResult.accessToken && tokenResult.refreshToken) {
                    setToken(tokenResult)
                }
                else {
                    setError(true)
                    throw new Error("Error retrieving access code")
                }
            }
            fetchAccessToken()
        }
        else if (response?.type === 'error') {
            throw response.error
        }
    }, [response])


    const signUp = () => {
        promptAsync({ useProxy: false })
    }

    return [signUp, token, error];
};