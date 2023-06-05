import React, { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { ReceiptData, submitData } from '../../../helpers/receipts'
import { Ionicons } from '@expo/vector-icons'
import { UserContext } from '../../../context/userContext'
import { redirect } from 'react-router-native'

const ReceiptSave: React.FC = () => {
    const { user } = useContext(UserContext) as UserContext
    const { state } = useContext(ReceiptContext)

    const composeData = (): ReceiptData => {
        const data: ReceiptData = {
            title: state.title,
            accusee: state.accusee,
            claims: state.claims,
            collectionDate: state.collectDate.toDateString(),
            userId: user?.id as number
        }

        if (state.filename) {
            data['imageUrl'] = state.filename
        }
        return data
    }

    const handleSave = async () => {
        const data = composeData()
        const res = await submitData(data)

        if (res?.data) {
            return redirect("/receipts")
        }
    }

    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Save Your Receipt</Text>
                <TouchableOpacity style={[t.border2, t.rounded, t.mT5]} onPress={handleSave}>
                    <Ionicons name="receipt" size={48} color="black" style={{ paddingHorizontal: 32, paddingVertical: 16 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReceiptSave