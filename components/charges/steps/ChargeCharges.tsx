import React, { useContext } from 'react'
import { Button, TextInput, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const ChargeCharges: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)
    return (
        <View style={[t.flex]}>
            <Button title='Add Charges' onPress={_e => dispatch(new Action.Charges.AddCharge)} />
            {state.charges.map((charge, i) => {
                return (
                    <View style={[t.mY1, t.flex, t.flexRow, t.itemsCenter]} key={`charge-${i}`}>
                        <TextInput
                            placeholder='Charge'
                            value={charge}
                            onChangeText={text => dispatch(new Action.Charges.UpdateCharge(i, text))}
                            style={[t.bgWhite, t.rounded, t.pY1, t.pX1, t.w5_6]}
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
        </View>
    )
}

export default ChargeCharges