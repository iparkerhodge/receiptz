import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { t } from 'react-native-tailwindcss'

const REGEX = /^(0|[1-9][0-9]*)$/

interface PhoneInputProps {
    onChange?: (data: { phoneNumber: string; formattedPhoneNumber: string }) => void
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onChange }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [formattedNumber, setFormattedNumber] = useState('')

    const formatPhoneNumber = (value: string): void => {
        const numbersArr = value.split('')
        let formatted = value

        if (numbersArr.length >= 3) {
            // (123)
            formatted = '(' + numbersArr.splice(0, 3).join('') + ') '

            // (123) 456-7
            if (numbersArr.length >= 3) {
                // (123) 456
                formatted += numbersArr.splice(0, 3).join('') + '-'

                if (numbersArr.length > 0) {
                    formatted += numbersArr.join('')
                }
            }
            else {
                formatted += numbersArr.join('')
            }
        }

        setFormattedNumber(formatted)
    }

    useEffect(() => {
        formatPhoneNumber(phoneNumber)
    }, [phoneNumber])

    useEffect(() => {
        const data = { phoneNumber: phoneNumber, formattedPhoneNumber: formattedNumber }
        if (onChange) { onChange(data) }
    }, [formattedNumber])

    const handlePhoneNumberChange = (value: string) => {
        if ((value.length > 0 && !value.slice(-1).match(REGEX)) || value.length > 10) {
            return
        }
        setPhoneNumber(value)
    }
    return (
        <View style={[t.wFull, t.relative, t.h5]}>
            <View style={[t.bgWhite, t.absolute, t.top0, t.left0, t.wFull, t.h5, t.rounded, t.pL1]}>
                <View style={[t.h5, t.flex, t.justifyCenter]}>
                    {formattedNumber.length > 0
                        ? <Text>{formattedNumber}</Text>
                        : <Text style={{ color: '#C7C7CD' }}>(678) 999-8212</Text>
                    }
                </View>
            </View>
            <TextInput keyboardType='phone-pad'
                style={[t.bgTransparent, t.textTransparent, t.h6]}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                caretHidden />
        </View>
    )
}

export default PhoneInput