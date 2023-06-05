import React, { useEffect, useState } from 'react'
import { Receipt } from '../../types/types'
import { t } from 'react-native-tailwindcss'
import { View, Text, Image } from 'react-native'
import { storage } from '../../firebase'
import { getDownloadURL, ref } from 'firebase/storage'

interface ReceiptListItemProps {
    receipt: Receipt
    index: number
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ receipt, index }) => {
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

    const formatDate = (d: Date) => {
        const date = new Date(d)
        let newDate = new Date()
        newDate.setDate(date.getDate() + 1)
        return newDate.toDateString()
    }

    return (
        <View style={[t.wFull, t.bgWhite, t.pX1, t.pY2, t.mY1, t.rounded]}>
            <View style={[t.flex, t.flexRow]}>
                {image &&
                    <Image source={{ uri: image }} style={{ height: 120, width: 80, marginRight: 4, borderRadius: 4 }} />
                }
                <View style={[t.flex1, t.flex, t.justifyBetween]}>
                    <View>
                        <Text style={[t.fontBold, t.mB1]}>{receipt.title}</Text>
                        {receipt.claims.map((c, i) => {
                            return (
                                <Text style={[t.textXs, t.mL1]} key={`receipt-${index}-claim-${i}`}>{c}</Text>
                            )
                        })}
                    </View>
                    <View style={[t.flex, t.itemsEnd]}>
                        <Text style={[t.textXs]}>{formatDate(receipt.collectionDate)}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default ReceiptListItem