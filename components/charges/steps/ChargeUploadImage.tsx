import React, { useContext } from 'react'
import { Text, TextInput, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ChargeContext } from '../../../context/chargeContext'
import { Action } from '../../../helpers/charges'
import { inputStyle } from './Styles'
import * as ImagePicker from 'expo-image-picker'
import useUploadFile from '../../../hooks/storage/useUploadFile'
import { storageFileRef } from '../../../firebase'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ChargeUploadImage: React.FC = () => {
    const { state, dispatch } = useContext(ChargeContext)
    const [uploadFile, uploading, snapshot, error] = useUploadFile();

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
    return (
        <View style={[t.mX2, t.flex, t.itemsCenter, t.wFull]}>
            <FontAwesome.Button
                name='upload' style={[t.flexColReverse, t.p4]}
                iconStyle={[t.p2]}
                onPress={pickImage}
                backgroundColor={state.selectedImage ? '#48bb78' : '#1a202c'}
            >
                Upload Evidence
            </FontAwesome.Button>
        </View>
    )
}

export default ChargeUploadImage