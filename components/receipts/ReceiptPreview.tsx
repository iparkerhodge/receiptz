import React, { useContext, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import ZigzagLines from 'react-native-zigzag-lines'
import { ReceiptContext } from '../../context/receiptContext'
import { UserContext } from '../../context/userContext'

const ReceiptPreview: React.FC = () => {
    const { user } = useContext(UserContext) as UserContext
    const [width, setWidth] = useState<number | undefined>(undefined)
    const { state } = useContext(ReceiptContext)
    return (
        <View style={[t.w3_4, t.bgWhite]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
            {typeof width == 'number' &&
                <ZigzagLines
                    width={width}
                    height={5}
                    jagWidth={12}
                    backgroundColor="black"
                    color="#FFF"
                    position='top' />
            }
            <Text style={[t.textCenter, t.mY4, t.fontReceipt, t.text2xl, t.borderB2, t.borderBlack]}>{state.title || 'Title'}</Text>
            <Text style={[t.mL5, t.mB4, t.fontReceipt]}>Created: {state.dateCreated}</Text>
            <View style={[t.flex, t.itemsCenter, t.mT2]}>
                {state.selectedImage &&
                    <Image source={{ uri: state.selectedImage }} style={{ width: 200, height: 200 }} />
                }
            </View>
            <View style={[t.mT4, t.mL5, t.mR10]}>
                {state.claims?.map(((claim: string, i: number) => {
                    return (
                        <View style={[t.flex, t.flexRow, t.mY1]} key={`receipt-preview-${i}`}>
                            <Text style={[t.mR3, t.fontReceipt]}>1</Text>
                            <Text style={[t.fontReceipt]}>{claim}</Text>
                        </View>
                    )
                }))}
                <Text>-------------</Text>
                {state.claims && state.claims.length > 0 && <Text style={[t.fontReceipt]}>Total: {state.claims.length}</Text>}
            </View>
            <View style={[t.mT2, t.mL5]}>
                <Text style={[t.fontReceipt]}>Cardholder name: {state.accusee}</Text>
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
    )
}

export default ReceiptPreview