import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'

const Header = () => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    return (
        <View style={[t.flex, t.flexRow, t.justifyCenter, t.wFull]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            <Text style={[t.fontReceipt, t.textWhite, t.text3xl, t.textCenter]}>Receiptz</Text>
        </View>
    )
}

export default Header