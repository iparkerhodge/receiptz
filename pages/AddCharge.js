import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, TextInput } from 'react-native'
import { t } from 'react-native-tailwindcss'
import DateTimePicker from '@react-native-community/datetimepicker';

const AddCharge = () => {
    return (
        <View style={[t.bgWhite, t.hFull, t.pB20, t.flex, t.itemsCenter, t.pT3]}>
            <Text style={[t.fontReceipt, t.text3xl, t.mB3]}>Add a Charge</Text>
            <View style={[t.w3_4, t.flex, t.bgGray400, t.p3, t.rounded]}>
                <View style={{ display: 'flex', gap: 12 }}>
                    <TextInput placeholder='Title' style={[t.bgWhite, t.rounded, t.pY1, t.pL1]} />
                    <FontAwesome.Button name='upload' style={[t.bgGray900, t.flexColReverse, t.p4]} iconStyle={[t.p2]}>
                        Upload Evidence
                    </FontAwesome.Button>
                    <DateTimePicker mode='date' value={new Date()} />
                </View>
            </View>
        </View >
    )
}
export default AddCharge