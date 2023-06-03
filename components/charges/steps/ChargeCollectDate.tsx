import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { inputStyle } from './Styles'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


const ChargeCollectDate: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)

    const handleDateChange = (_e: DateTimePickerEvent, date?: Date) => {
        if (date) {
            dispatch(new Action.CollectDate(date))
        }
    }

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={[t.pB2]}>Date to Collect</Text>
            <DateTimePicker
                display="compact"
                mode="date"
                value={state.collectDate}
                onChange={handleDateChange}
            />
        </View>
    )
}

export default ChargeCollectDate