import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { Action } from '../../../helpers/receipts'
import { inputStyle } from './Styles'

const ReceiptAccusee: React.FC = () => {
    const { state, dispatch } = useContext(ReceiptContext)
    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Who is this receipt for?</Text>
                <TextInput
                    style={inputStyle}
                    value={state.accusee}
                    onChangeText={text => dispatch(new Action.Accusee(text))}
                />
            </View>
        </View>
    )
}

export default ReceiptAccusee