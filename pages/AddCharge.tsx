import React, { Reducer, useContext, useEffect, useReducer, useState } from 'react'
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
import ChargePreview from '../components/charges/ChargePreview';
import { Action, ChargeState, ChargeStateAction, chargeReducer, initialChargeState } from '../helpers/charges';
import ChargeTitle from '../components/charges/steps/ChargeTitle';
import ChargeProvider from '../context/chargeContext';
import ChargeAccusee from '../components/charges/steps/ChargeAccusee';
import ChargeCharges from '../components/charges/steps/ChargeCharges';
import ChargeUploadImage from '../components/charges/steps/ChargeUploadImage';
import ChargeCollectDate from '../components/charges/steps/ChargeCollectDate';

const api = `http://127.0.0.1:3000`;


const AddCharge = () => {
    const [step, setStep] = useState(0)
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

    const ChargeForm = () => {
        switch (step) {
            case 0:
                return <ChargeTitle />
            case 1:
                return <ChargeAccusee />
            case 2:
                return <ChargeCharges />
            case 3:
                return <ChargeUploadImage />
            case 4:
                return <ChargeCollectDate />
            default:
                return <ChargeTitle />
        }
    }

    // TO DO: add error handling

    return (
        <ScrollView style={[t.bgWhite, t.hFull, t.pB20, t.flex, t.pT3]} contentContainerStyle={[t.itemsCenter]}>
            <ChargeProvider>
                {/* FORM  */}
                <Text style={[t.fontReceipt, t.text3xl, t.mB3]}>Create a Receipt</Text>
                <View style={[t.mB10, t.p4, t.bgGray400, t.w3_4, t.rounded]}>
                    <View style={{ height: 150, display: 'flex', justifyContent: 'space-between' }}>
                        <ChargeForm />
                        <View style={[t.flex, t.flexRow, t.justifyBetween, t.wFull]}>
                            <Button title='Prev' onPress={() => setStep(step - 1)} disabled={step === 0} />
                            <Button title='Next' onPress={() => setStep(step + 1)} disabled={step === 4} />
                        </View>
                    </View>
                </View>
                {/* Preview  */}
                <View style={[t.mT10, t.bgGray400, t.wFull, t.hFull, t.pT4, t.flex, t.itemsCenter, t.pB20]}>
                    <ChargePreview />
                    <View style={[t.mT6]}>
                        <Text>Remind me to collect on {state.collectDate?.toDateString()}</Text>
                    </View>
                    <View style={[t.mB20]}>
                        <Button title='Save' onPress={handleSave} />
                    </View>
                </View>
            </ChargeProvider>
        </ScrollView >
    )
}
export default AddCharge