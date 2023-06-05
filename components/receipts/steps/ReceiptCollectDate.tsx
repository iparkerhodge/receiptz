import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { Action } from '../../../helpers/receipts'
import { inputStyle } from './Styles'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


const ReceiptCollectDate: React.FC = () => {
    const { state, dispatch } = useContext(ReceiptContext)

    const handleDateChange = (_e: DateTimePickerEvent, date?: Date) => {
        if (date) {
            dispatch(new Action.CollectDate(date))
        }
    }

    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20, display: 'flex', alignItems: 'center' }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB2, t.fontBold]}>Date to Collect</Text>
                <DateTimePicker
                    display="compact"
                    mode="date"
                    value={state.collectDate}
                    onChange={handleDateChange}
                />
            </View>
        </View>
    )
}

export default ReceiptCollectDate