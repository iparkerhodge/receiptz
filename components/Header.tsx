import React from 'react'
import { Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'

const Header = () => {
    return (
        <View style={[t.flex, t.flexRow, t.justifyCenter, t.wFull]}>
            <Text style={[t.fontReceipt, t.textWhite, t.text3xl, t.textCenter]}>Receiptz</Text>
        </View>
    )
}

export default Header