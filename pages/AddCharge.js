import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity } from 'react-native'
import { t } from 'react-native-tailwindcss'
import DateTimePicker from '@react-native-community/datetimepicker';
import ZigzagLines from 'react-native-zigzag-lines';
import * as ImagePicker from 'expo-image-picker'
import { text } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddCharge = () => {
    const dateCreated = new Date().toDateString()
    let initialCollectDate = new Date()
    initialCollectDate.setDate(initialCollectDate.getDate() + 1)
    const [width, setWidth] = useState(undefined)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [charges, setCharges] = useState([""])
    const [collectDate, setCollectDate] = useState(initialCollectDate)

    const handleDateChange = (_e, date) => setCollectDate(date)

    const addCharge = () => {
        const vals = [...charges]
        vals.push("")
        setCharges(vals)
    }

    const handleChargesChange = (i, text) => {
        const vals = [...charges]
        vals[i] = text
        setCharges(vals)
    }

    const removeCharge = (i) => {
        const vals = [...charges]
        vals.splice(i, 1)
        setCharges(vals)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    return (
        <ScrollView style={[t.bgWhite, t.hFull, t.pB20, t.flex, t.pT3]} contentContainerStyle={[t.itemsCenter]}>
            {/* FORM  */}
            <Text style={[t.fontReceipt, t.text3xl, t.mB3]}>Create a Charge</Text>
            <View style={[t.w3_4, t.flex, t.bgGray400, t.p3, t.rounded]}>
                <View style={{ display: 'flex', gap: 12 }}>
                    <TextInput
                        placeholder='Title'
                        style={[t.bgWhite, t.rounded, t.pY1, t.pX1]}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <View style={[t.flex]}>
                        <Button title='Add Charges' onPress={addCharge} />
                        {charges.map((charge, i) => {
                            return (
                                <View style={[t.flex1, t.mY1, t.flex, t.flexRow, t.itemsCenter]} key={`charge-${i}`}>
                                    <TextInput
                                        placeholder='Charge'
                                        value={charge}
                                        onChangeText={text => handleChargesChange(i, text)}
                                        style={[t.bgWhite, t.rounded, t.pY1, t.pX1, t.w5_6]}
                                    />
                                    <View style={[t.w1_6, t.pX2]}>
                                        <TouchableOpacity
                                            style={[t.bgGray900, t.flex, t.itemsCenter, t.hFull, t.justifyCenter, t.rounded]}
                                            onPress={_e => removeCharge(i)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} size={10} color='white' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <FontAwesome.Button name='upload' style={[t.flexColReverse, t.p4]} iconStyle={[t.p2]} onPress={pickImage} backgroundColor={image ? '#48bb78' : '#1a202c'}>
                        Upload Evidence
                    </FontAwesome.Button>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={[t.pB2]}>Date to Collect</Text>
                        <DateTimePicker
                            display="compact"
                            mode="date"
                            value={collectDate}
                            onChange={handleDateChange}
                        />
                    </View>
                </View>
            </View>
            {/* Preview  */}
            <View style={[t.mT10, t.bgGray400, t.wFull, t.hFull, t.pT4, t.flex, t.itemsCenter, t.pB20]}>
                <View style={[t.w3_4, t.bgWhite]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
                    {typeof width == 'number' &&
                        <ZigzagLines
                            width={width}
                            height={5}
                            backgroundColor="#cbd5e0"
                            color="#FFF"
                            position='top' />
                    }
                    <Text style={[t.textCenter, t.mY4, t.fontReceipt, t.text2xl, t.borderB2, t.borderBlack]}>{title || 'Title'}</Text>
                    <Text style={[t.mL5, t.mB4, t.fontReceipt]}>Created: {dateCreated}</Text>
                    <View style={[t.flex, t.itemsCenter, t.mT2]}>
                        {image &&
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        }
                    </View>
                    <View style={[t.mT4, t.mL5, t.mR10]}>
                        {charges.map(((charge, i) => {
                            return (
                                <View style={[t.flex, t.flexRow, t.mY1]} key={`charge-preview-${i}`}>
                                    <Text style={[t.mR3, t.fontReceipt]}>1</Text>
                                    <Text style={[t.fontReceipt]}>{charge}</Text>
                                </View>
                            )
                        }))}
                        <Text>-------------</Text>
                        {charges.length > 0 && <Text style={[t.fontReceipt]}>Total: {charges.length}</Text>}
                    </View>
                    <View style={[t.mT2, t.mL5]}>
                        <Text style={[t.fontReceipt]}>Cardholder name:</Text>
                    </View>
                    <View style={[t.mY5, t.flex, t.itemsCenter]}>
                        <Text style={[t.fontReceipt]}>Vendor:</Text>
                        <Text style={[t.fontReceipt]}>Parker Hodge</Text>
                    </View>
                    <View style={[t.mT6, t.mB4]}>
                        <Text style={[t.mX2, t.fontReceipt, t.textCenter]}>Processed by <Text style={[t.underline]}>Receiptz</Text>, the app to track bets, wagers, and absurd predictions</Text>
                    </View>
                    {typeof width == 'number' &&
                        <ZigzagLines
                            width={width}
                            height={5}
                            backgroundColor="#cbd5e0"
                            color="#FFF"
                            position='bottom' />
                    }
                </View>
                <View style={[t.mT6]}>
                    <Text>Remind me to collect on {collectDate.toDateString()}</Text>
                </View>
            </View>
        </ScrollView >
    )
}
export default AddCharge