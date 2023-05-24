import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import headerBg from '../assets/images/header-bg.png'

export default Header = () => {
    return (
        <View style={[t.flex, t.flexRow, t.justifyCenter, t.wFull]}>
            <ImageBackground source={headerBg} resizeMode='stretch' style={[t.flex, t.wFull, t.pB4]}>
                <Text style={[t.fontReceipt, t.textWhite, t.text3xl, t.textCenter]}>Receiptz</Text>
            </ImageBackground>
        </View>
    )
}