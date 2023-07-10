import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import PhoneInput from './PhoneInput'
import { FontAwesome } from '@expo/vector-icons'

interface SignUpFormProps {
    onSubmit: (data: { name: string, password: string, mobileNumber: string }) => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [disableSubmit, setDisableSubmit] = useState(true)

    const buttonStyle = disableSubmit ? [t.borderRed500] : [t.borderWhite]
    const buttonTextStyle = disableSubmit ? [t.textRed500] : [t.textWhite]

    const handlePhoneNumberChange = (data: { phoneNumber: string; formattedPhoneNumber: string }) => {
        setPhoneNumber(data.phoneNumber)
    }

    useEffect(() => {
        if (phoneNumber.length === 10 && password.length > 5) {
            setDisableSubmit(false)
        }
        else {
            setDisableSubmit(true)
        }
    }, [phoneNumber, password])

    return (
        <View style={[t.wFull, t.flex, t.itemsCenter, t.pT4]}>
            <View style={[t.flex, t.flexRow, t.itemsCenter, { gap: 4 }]}>
                <FontAwesome name="user" size={15} color="white" />
                <TextInput
                    style={[t.wFull, t.bgWhite, t.h5, t.rounded, t.pL1]}
                    placeholder='Name or Alias'
                    onChangeText={setName}
                />
            </View>
            <View style={[t.flex, t.flexRow, t.itemsCenter, t.mY1, { gap: 4 }]}>
                <FontAwesome name="mobile-phone" size={24} color="white" />
                <PhoneInput onChange={handlePhoneNumberChange} />
            </View>
            <View style={[t.flex, t.flexRow, t.itemsCenter, { gap: 4 }]}>
                <FontAwesome name="lock" size={18} color="white" />
                <TextInput
                    style={[t.wFull, t.bgWhite, t.h5, t.rounded, t.pL1]}
                    placeholder='Password'
                    onChangeText={setPassword}
                    secureTextEntry />
            </View>
            <TouchableOpacity
                disabled={disableSubmit}
                style={[t.border2, buttonStyle, t.rounded, t.mT2, t.pY1, t.pX2]}
                onPress={async () => await onSubmit({ name: name, password: password, mobileNumber: phoneNumber })}
            >
                <Text style={[buttonTextStyle, t.fontBold]}>Create an Account</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpForm