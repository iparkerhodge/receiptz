import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { Action } from '../../../helpers/receipts'
import { Ionicons } from '@expo/vector-icons'

const ReceiptSave: React.FC = () => {
    const { state, dispatch } = useContext(ReceiptContext)

    const saveReceipt = async () => {
        const data = {
            title: state.title,
            accusee: state.accusee,
            claims: state.claims
        }
    }
    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Save Your Receipt</Text>
                <TouchableOpacity style={[t.border2, t.rounded, t.mT5]}>
                    <Ionicons name="receipt" size={48} color="black" style={{ paddingHorizontal: 32, paddingVertical: 16 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReceiptSave