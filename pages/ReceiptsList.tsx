import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView, Modal, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import { Receipt } from '../types/types'
import { UserContext } from '../context/userContext'
import { ReceiptContext } from '../context/receiptContext'
import ReceiptListItem from '../components/receipts/ReceiptListItem'
import { t } from 'react-native-tailwindcss'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import ZigzagLines from 'react-native-zigzag-lines'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { BlurView } from "@react-native-community/blur"


const api = `http://127.0.0.1:3000`

const Receipts = () => {
    const { user } = useContext(UserContext) as UserContext
    const { receipts, setReceipts } = useContext(ReceiptContext)
    const [preview, showPreview] = useState<Receipt | null>()

    const displayPreview = (receipt: Receipt) => {
        showPreview(receipt)
    }

    useEffect(() => {
        const getReceipts = async () => {
            const res = await axios.get<Receipt[]>(`${api}/receipts/${user?.id}/list`)
            setReceipts(res.data)
        }
        getReceipts()
    }, [])

    return (
        <>
            <ScrollView style={[t.wFull, t.pT4]} contentContainerStyle={[t.flex, t.itemsCenter]}>
                {receipts.map((r: Receipt, i: number) => <ReceiptListItem receipt={r} index={i} key={i} displayPreview={displayPreview} />)}
            </ScrollView>
            {preview &&
                <View style={[t.wFull, t.hFull, t.bgBlack, t.opacity25, t.absolute, t.top0]} />
            }
            <Modal visible={!!preview} transparent animationType='slide'>
                <KeyboardAvoidingView style={{ position: 'absolute', bottom: 0, width: '100%' }} behavior='padding'>
                    <ReceiptPreview receipt={preview as Receipt} onClose={() => showPreview(null)} />
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}
export default Receipts

interface IReceiptPreview {
    receipt: Receipt
    onClose: () => void
}
export const ReceiptPreview: React.FC<IReceiptPreview> = ({ receipt, onClose }) => {
    const { user } = useContext(UserContext) as UserContext
    const [width, setWidth] = useState<number | undefined>()
    const [image, setImage] = useState<string | undefined>()

    useEffect(() => {
        if (receipt.imageUrl) {
            const getImage = async () => {
                const imageRef = ref(storage, receipt.imageUrl)
                const res = await getDownloadURL(imageRef)
                setImage(res)
            }
            getImage()
        }
    }, [])

    const formatDate = (d: Date): string => new Date(d).toDateString()

    return (
        <BlurView blurAmount={1} style={{ borderRadius: 10, marginBottom: 20 }}>
            <View style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 6, paddingTop: 6, marginBottom: 5 }}>
                <TouchableOpacity onPress={onClose}>
                    <FontAwesomeIcon icon={faXmarkCircle} color='white' />
                </TouchableOpacity>
            </View>
            <View style={[t.flex, t.itemsCenter]}>
                <View style={[t.w3_4]}>
                    <View style={[t.wFull, t.bgWhite, t.flex]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
                        {typeof width == 'number' &&
                            <ZigzagLines
                                width={width}
                                height={5}
                                jagWidth={12}
                                backgroundColor="rgba(0, 0, 0, 0.75)"
                                color="#FFF"
                                position='top' />
                        }
                        <Text style={[t.textCenter, t.mY4, t.fontReceipt, t.text2xl, t.borderB2, t.borderBlack, t.mX2]}>{receipt.title}</Text>
                        <Text style={[t.mL5, t.mB4, t.fontReceipt]}>Created: {formatDate(receipt.createdAt)}</Text>
                        <View style={[t.flex, t.itemsCenter, t.mT2]}>
                            {receipt.imageUrl &&
                                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                            }
                        </View>
                        <View style={[t.mT4, t.mL5, t.mR10]}>
                            {receipt.claims?.map(((claim: string, i: number) => {
                                return (
                                    <View style={[t.flex, t.flexRow, t.mY1]} key={`receipt-preview-${i}`}>
                                        <Text style={[t.mR3, t.fontReceipt]}>1</Text>
                                        <Text style={[t.fontReceipt]}>{claim}</Text>
                                    </View>
                                )
                            }))}
                            <Text>-------------</Text>
                            {receipt.claims && receipt.claims.length > 0 && <Text style={[t.fontReceipt]}>Total: {receipt.claims.length}</Text>}
                        </View>
                        <View style={[t.mT2, t.mL5]}>
                            <Text style={[t.fontReceipt]}>Cardholder name: {receipt.accusee}</Text>
                        </View>
                        <View style={[t.mY5, t.flex, t.itemsCenter]}>
                            <Text style={[t.fontReceipt]}>Vendor:</Text>
                            <Text style={[t.fontReceipt]}>{user?.twitterName || 'Your Name'}</Text>
                        </View>
                        <View style={[t.mT6, t.mB4]}>
                            <Text style={[t.mX2, t.fontReceipt, t.textCenter]}>Processed by <Text style={[t.underline]}>Receiptz</Text>, the app to track bets, wagers, and absurd predictions</Text>
                        </View>
                        {typeof width == 'number' &&
                            <ZigzagLines
                                width={width}
                                height={5}
                                jagWidth={12}
                                backgroundColor="black"
                                color="#FFF"
                                position='bottom' />
                        }
                    </View>
                </View>
            </View>
        </BlurView>
    )
}