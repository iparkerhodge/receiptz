import React from 'react'
import { User } from '../../types/types'
import { Image, Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'

interface TwitterProfileProps {
    user: User
}

const TwitterProfile: React.FC<TwitterProfileProps> = ({ user }) => {
    return (
        <View
            style={[t.flex, t.flexRow, t.justifyBetween, t.bgWhite, t.w1_2, t.pX2, t.pY5, t.mT5, t.rounded]}
        >
            <View>
                <Image
                    source={{ uri: user.twitterProfileImage }}
                    style={{ width: 40, height: 40, borderRadius: 25, }}
                />
            </View>
            <View>
                <Text style={[t.fontBold]}>{user.twitterName}</Text>
                <Text>@{user.twitterUsername}</Text>
            </View>
        </View>
    )
}

export default TwitterProfile