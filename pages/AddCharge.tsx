import React, { Reducer, useEffect, useReducer, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity } from 'react-native'
import { t } from 'react-native-tailwindcss'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ZigzagLines from 'react-native-zigzag-lines';
import * as ImagePicker from 'expo-image-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { storageFileRef } from '../firebase'
import useUploadFile from '../hooks/storage/useUploadFile';
import axios from 'axios';
import Charge from '../components/charges/Charge';
import { Action, ChargeState, ChargeStateAction, chargeReducer, initialChargeState } from '../helpers/charges';

const api = `http://127.0.0.1:3000`;


const AddCharge = () => {
    const [state, dispatch] = useReducer<Reducer<ChargeState, ChargeStateAction>>(chargeReducer, initialChargeState)
    const [uploadFile, uploading, snapshot, error] = useUploadFile();

    const handleDateChange = (_e: DateTimePickerEvent, date?: Date) => {
        if (date) {
            dispatch(new Action.CollectDate(date))
        }
    }

    const uploadImage = async (file: ImagePicker.ImagePickerAsset) => {
        if (file) {
            const blob: Blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", file.uri, true);
                xhr.send(null);
            });

            const imageRef = storageFileRef(new Date().toISOString()) // TO DO: change file name to user/datetime
            const result = await uploadFile(imageRef, blob, {
                contentType: 'image/jpeg'
            });

            return result?.metadata
        }
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
            dispatch(new Action.SelectedImage(result.assets[0].uri))
            const res = await uploadImage(result.assets[0])
            dispatch(new Action.Filename(res?.name || ""))
        }
    }

    const handleSave = async () => {
        const data = {
            title: state.title,
            accusee: state.accusee,
            image_url: state.filename,
            counts: state.charges,
            collection_date: state.collectDate
        }

        console.log(api)
        const _res = await axios.post(`${api}/charge`, { charge: data })
    }

    // TO DO: add error handling

    return (
        <ScrollView style={[t.bgWhite, t.hFull, t.pB20, t.flex, t.pT3]} contentContainerStyle={[t.itemsCenter]}>
            {/* FORM  */}
            <Text style={[t.fontReceipt, t.text3xl, t.mB3]}>Create a Receipt</Text>
            <View style={[t.w3_4, t.flex, t.bgGray400, t.p3, t.rounded]}>
                <View style={{ display: 'flex', gap: 12 }}>
                    <TextInput
                        placeholder='Title'
                        style={[t.bgWhite, t.rounded, t.pY1, t.pX1]}
                        value={state.title}
                        onChangeText={title => dispatch(new Action.Title(title))}
                    />
                    <TextInput
                        placeholder='Accusee'
                        style={[t.bgWhite, t.rounded, t.pY1, t.pX1]}
                        value={state.accusee}
                        onChangeText={text => dispatch(new Action.Accusee(text))}
                    />
                    <View style={[t.flex]}>
                        <Button title='Add Charges' onPress={_e => dispatch(new Action.Charges.AddCharge)} />
                        {state.charges.map((charge, i) => {
                            return (
                                <View style={[t.flex1, t.mY1, t.flex, t.flexRow, t.itemsCenter]} key={`charge-${i}`}>
                                    <TextInput
                                        placeholder='Charge'
                                        value={charge}
                                        onChangeText={text => dispatch(new Action.Charges.UpdateCharge(i, text))}
                                        style={[t.bgWhite, t.rounded, t.pY1, t.pX1, t.w5_6]}
                                    />
                                    <View style={[t.w1_6, t.pX2]}>
                                        <TouchableOpacity
                                            style={[t.bgGray900, t.flex, t.itemsCenter, t.hFull, t.justifyCenter, t.rounded]}
                                            onPress={_e => dispatch(new Action.Charges.RemoveCharge(i))}
                                        >
                                            <FontAwesomeIcon icon={faTrash} size={10} color='white' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <FontAwesome.Button
                        name='upload' style={[t.flexColReverse, t.p4]}
                        iconStyle={[t.p2]}
                        onPress={pickImage}
                        backgroundColor={state.selectedImage ? '#48bb78' : '#1a202c'}
                    >
                        Upload Evidence
                    </FontAwesome.Button>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={[t.pB2]}>Date to Collect</Text>
                        <DateTimePicker
                            display="compact"
                            mode="date"
                            value={state.collectDate}
                            onChange={handleDateChange}
                        />
                    </View>
                </View>
            </View>
            {/* Preview  */}
            <View style={[t.mT10, t.bgGray400, t.wFull, t.hFull, t.pT4, t.flex, t.itemsCenter, t.pB20]}>
                <Charge
                    title={state.title}
                    dateCreated={state.dateCreated}
                    accusee={state.accusee}
                    selectedImage={state.selectedImage}
                    charges={state.charges}
                />
                <View style={[t.mT6]}>
                    <Text>Remind me to collect on {state.collectDate?.toDateString()}</Text>
                </View>
                <View>
                    <Button title='Save' onPress={handleSave} />
                </View>
            </View>
        </ScrollView >
    )
}
export default AddCharge