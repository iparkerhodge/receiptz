import React, { useContext } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { Action, initialReceiptState } from '../../../helpers/receipts'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native'
import { shortInputStyle } from './Styles'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ReceiptClaims: React.FC = () => {
    const { state, dispatch } = useContext(ReceiptContext)
    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>What claims did {state.accusee === initialReceiptState.accusee ? '*Person*' : state.accusee} make?</Text>
                <View style={[t.wFull, t.flex, t.itemsCenter, t.mB4]}>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 35 }}>
                        <FontAwesome.Button
                            name='plus'
                            color={'black'}
                            style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, flex: 1 }}
                            onPress={_e => dispatch(new Action.Claims.AddClaim)}
                            size={15}>
                            <Text style={[t.textXs, t.fontBold]}>Add More</Text>
                        </FontAwesome.Button>
                    </View>
                </View>
                <ScrollView style={{ height: 180 }}>
                    {state.claims.map((claim: string, i: number) => {
                        return (
                            <View style={[t.mY1, t.flex, t.flexRow, t.itemsCenter, t.justifyCenter]} key={`claim-${i}`}>
                                <TextInput
                                    placeholder='Claim'
                                    value={claim}
                                    onChangeText={text => dispatch(new Action.Claims.UpdateClaim(i, text))}
                                    style={shortInputStyle}
                                />
                                <View style={[t.w1_6, t.pX2]}>
                                    <TouchableOpacity
                                        style={[t.bgGray900, t.flex, t.itemsCenter, t.justifyCenter, t.rounded, t.pY2]}
                                        onPress={_e => dispatch(new Action.Claims.RemoveClaim(i))}
                                    >
                                        <FontAwesomeIcon icon={faTrash} size={10} color='white' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View >
    )
}

export default ReceiptClaims