import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { inputStyle } from './Styles'

const ChargeAccusee: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)
    return (
        <View style={[t.mX2, t.flex, t.itemsCenter, t.wFull]}>
            <Text style={[t.mB1, t.fontBold]}>Tag a Person</Text>
            <TextInput
                style={inputStyle}
                value={state.accusee}
                onChangeText={text => dispatch(new Action.Accusee(text))}
            />
        </View>
    )
}

export default ChargeAccusee