import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { containerStyle, inputStyle } from './Styles'

const ChargeAccusee: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)
    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Tag a Person</Text>
                <TextInput
                    style={inputStyle}
                    value={state.accusee}
                    onChangeText={text => dispatch(new Action.Accusee(text))}
                />
            </View>
        </View>
    )
}

export default ChargeAccusee