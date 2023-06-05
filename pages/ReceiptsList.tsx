import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Receipt } from '../types/types'
import { UserContext } from '../context/userContext'
import { ReceiptContext } from '../context/receiptContext'
import ReceiptListItem from '../components/receipts/ReceiptListItem'
import { t } from 'react-native-tailwindcss'

const api = `http://127.0.0.1:3000`

const Receipts = () => {
    const { user } = useContext(UserContext) as UserContext
    const { receipts, setReceipts } = useContext(ReceiptContext)

    useEffect(() => {
        const getReceipts = async () => {
            const res = await axios.get<Receipt[]>(`${api}/receipts/${user?.id}/list`)
            setReceipts(res.data)
        }
        getReceipts()
    }, [])

    return (
        <ScrollView style={[t.wFull, t.pT4]} contentContainerStyle={[t.flex, t.itemsCenter]}>
            {receipts.map((r: Receipt, i: number) => <ReceiptListItem receipt={r} index={i} key={i} />)}
        </ScrollView>
    )
}
export default Receipts