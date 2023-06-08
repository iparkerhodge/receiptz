import React, { useEffect, useState } from 'react'
import { Receipt } from '../../types/types'
import { t } from 'react-native-tailwindcss'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { storage } from '../../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { Feather } from '@expo/vector-icons'
import TooltipMenu from '../tooltipMenu/TooltipMenu'

interface ReceiptListItemProps {
    receipt: Receipt
    index: number
    displayPreview: (r: Receipt) => void
    displayEdit: (i: number, r: Receipt) => void
}

const ReceiptListItem: React.FC<ReceiptListItemProps> = ({ receipt, index, displayPreview, displayEdit }) => {
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
    }, [receipt.imageUrl])

    const formatDate = (d: Date) => {
        const date = new Date(d)
        return date.toDateString()
    }

    const MoreInfo = () => <Feather name="more-horizontal" size={18} color="black" />

    const handlePreviewPress = () => {
        displayPreview(receipt)
    }

    const handleEditPress = () => {
        displayEdit(index, receipt)
    }

    return (
        <View style={[t.wFull, t.bgWhite, t.pX1, t.pB2, t.pT1, t.mY1, t.rounded, { height: 160 }]}>
            <View style={[t.flex, t.flexRow, t.justifyEnd]}>
                <View style={{ width: 24, display: 'flex' }}>
                    <TooltipMenu items={[{ label: 'Edit', onPress: handleEditPress }, { label: 'Preview Receipt', onPress: handlePreviewPress }]} trianglePosition='right'>
                        <MoreInfo />
                    </TooltipMenu>
                </View>
            </View>
            <View style={[t.flex, t.flexRow]}>
                <View style={{ height: 120, width: 80, marginRight: 4, borderRadius: 4, position: 'relative' }}>
                    <Image source={{ uri: image }} style={{ height: 120, width: 80, borderRadius: 4, position: 'absolute', top: 0, right: 0 }} />
                </View>
                <View style={[t.flex1, t.flex, t.justifyBetween]}>
                    <View style={[t.mT3]}>
                        <Text style={[t.fontBold, t.mB1]}>{receipt.title}</Text>
                        {receipt.claims.map((c, i) => {
                            return (
                                <Text style={[t.textXs, t.mL1, t.mB1]} key={`receipt-${index}-claim-${i}`}>{c}</Text>
                            )
                        })}
                    </View>
                    <View style={[t.flex, t.flexRow, t.justifyBetween]}>
                        <Text style={[t.textXs]}>{receipt.accusee}</Text>
                        <Text style={[t.textXs]}>{formatDate(receipt.collectionDate)}</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default ReceiptListItem