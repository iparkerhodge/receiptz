import React, { useContext } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native'
import { shortInputStyle } from './Styles'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ChargeCharges: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)
    // TO DO: See if remove is working
    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20 }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Add Claims</Text>
                <View style={[t.wFull, t.flex, t.itemsCenter, t.mB4]}>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 35 }}>
                        <FontAwesome.Button
                            name='plus'
                            color={'black'}
                            style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, flex: 1 }}
                            onPress={_e => dispatch(new Action.Charges.AddCharge)}
                            size={15}>
                            <Text style={[t.textXs, t.fontBold]}>Add More</Text>
                        </FontAwesome.Button>
                    </View>
                </View>
                <ScrollView style={{ height: 180 }}>
                    {state.charges.map((charge, i) => {
                        return (
                            <View style={[t.mY1, t.flex, t.flexRow, t.itemsCenter, t.justifyCenter]} key={`charge-${i}`}>
                                <TextInput
                                    placeholder='Charge'
                                    value={charge}
                                    onChangeText={text => dispatch(new Action.Charges.UpdateCharge(i, text))}
                                    style={shortInputStyle}
                                />
                                <View style={[t.w1_6, t.pX2]}>
                                    <TouchableOpacity
                                        style={[t.bgGray900, t.flex, t.itemsCenter, t.justifyCenter, t.rounded, t.pY2]}
                                        onPress={_e => dispatch(new Action.Charges.RemoveCharge(i))}
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

export default ChargeCharges