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

    // TO DO: allow user to change image

    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20, display: 'flex', alignItems: 'center' }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB1, t.fontBold]}>Upload Evidence</Text>
                <View style={{ paddingTop: 20 }}>
                    <FontAwesome.Button
                        name='upload' style={{ display: 'flex', flexDirection: 'column-reverse', padding: 20 }}
                        iconStyle={{ paddingTop: 8 }}
                        onPress={pickImage}
                        backgroundColor={state.selectedImage ? '#48bb78' : '#1a202c'}
                    >
                        Upload an Image
                    </FontAwesome.Button>
                </View>
            </View>
        </View>
    )
}

export default ChargeUploadImage