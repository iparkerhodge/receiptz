import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { ReceiptContext } from '../../../context/receiptContext'
import { Action } from '../../../helpers/receipts'
import * as ImagePicker from 'expo-image-picker'
import useUploadFile from '../../../hooks/storage/useUploadFile'
import { storage, storageFileRef } from '../../../firebase'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage'
import { UserContext } from '../../../context/userContext'
import { Loading } from '../../Loading'

interface ReceiptUploadImageProps {
    edit?: boolean
}

const ReceiptUploadImage: React.FC<ReceiptUploadImageProps> = ({ edit }) => {
    const { user } = useContext(UserContext) as UserContext
    const { state, dispatch } = useContext(ReceiptContext)
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const [image, setImage] = useState<string | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (edit && state.filename) {
            const getImage = async () => {
                const imageRef = ref(storage, state.filename)
                const res = await getDownloadURL(imageRef)
                setImage(res)
                setLoading(false)
            }
            getImage()
        }
    }, [state.filename])

    // TO DO: add error handling
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

            const imageRef = storageFileRef(`@${user?.twitterUsername}/${new Date().toISOString()}`) // TO DO: change file name to user/datetime
            const result = await uploadFile(imageRef, blob, {
                contentType: 'image/jpeg'
            });

            return result?.metadata
        }
    }

    // TO DO: what happens if you upload an image and you're not logged in?
    const pickImage = async () => {
        // if an image is seleced, delete that image than
        if (state.filename) {
            const imageRef = ref(storage, `${state.filename}`)
            const _res = await deleteObject(imageRef)
        }

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setLoading(true)
            dispatch(new Action.SelectedImage(result.assets[0].uri))
            const res = await uploadImage(result.assets[0])
            dispatch(new Action.Filename(res?.fullPath || ""))
        }
    }

    const handleImageClick = async () => {
        const _res = await pickImage()
    }

    return (
        <View style={{ width: '100%', height: 250, paddingHorizontal: 20, display: 'flex', alignItems: 'center' }}>
            <View style={{ paddingTop: 10, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text style={[t.mB1, t.fontBold]}>Upload Evidence</Text>
                <View style={{ paddingTop: 20 }}>
                    {!edit &&
                        <FontAwesome.Button
                            name='upload' style={{ display: 'flex', flexDirection: 'column-reverse', padding: 20 }}
                            iconStyle={{ paddingTop: 8 }}
                            onPress={pickImage}
                            backgroundColor={state.selectedImage ? '#48bb78' : '#1a202c'}
                        >
                            Upload an Image
                        </FontAwesome.Button>}
                    {edit &&
                        (loading
                            ? <Loading bgColor='white' iconColor='black' />
                            : <TouchableOpacity onPress={handleImageClick}>
                                <Image source={{ uri: image }} style={{ height: 120, width: 90 }} />
                            </TouchableOpacity>
                        )

                    }
                </View>
            </View>
        </View>
    )
}

export default ReceiptUploadImage