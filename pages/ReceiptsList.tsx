import axios from 'axios'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { View, Text, ScrollView, Modal, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native'
import { Receipt } from '../types/types'
import { UserContext } from '../context/userContext'
import { ReceiptContext } from '../context/receiptContext'
import ReceiptListItem from '../components/receipts/ReceiptListItem'
import { t } from 'react-native-tailwindcss'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faArrowRight, faCircle, faCircleDot, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import ZigzagLines from 'react-native-zigzag-lines'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { BlurView } from "@react-native-community/blur"
import { Action, ReceiptData, getReceipts, updateReceipt } from '../helpers/receipts'
import ReceiptTitle from '../components/receipts/steps/ReceiptTitle'
import ReceiptAccusee from '../components/receipts/steps/ReceiptAccusee'
import ReceiptClaims from '../components/receipts/steps/ReceiptClaims'
import ReceiptUploadImage from '../components/receipts/steps/ReceiptUploadImage'
import ReceiptCollectDate from '../components/receipts/steps/ReceiptCollectDate'
import ReceiptSave from '../components/receipts/steps/ReceiptSave'

const api = `http://127.0.0.1:3000`

interface IReceiptEdit {
    receipt: Receipt
    index: number
}

const Receipts = () => {
    const { user } = useContext(UserContext) as UserContext
    const { dispatch } = useContext(ReceiptContext)
    const [receipts, setReceipts] = useState<Receipt[]>([])
    const [preview, showPreview] = useState<Receipt | null>()
    const [edit, showEdit] = useState<IReceiptEdit | null>()

    const displayPreview = (receipt: Receipt) => {
        showPreview(receipt)
    }

    const displayEdit = (index: number, receipt: Receipt) => {
        dispatch(new Action.SetForEdit(receipt))
        showEdit({ index: index, receipt: receipt })
    }

    // TO DO: move to helpers/receipts.ts
    const deleteReceipt = async (index: number, receipt: Receipt) => {
        try {
            const headers = { 'Authorization': `Bearer ${user?.receiptzToken}` }
            const res = await axios.delete(`${api}/receipts/${receipt.id}`, { headers: headers })
            if (res.status === 200) {
                const receiptsArr = [...receipts]
                receiptsArr.splice(index, 1)
                setReceipts(receiptsArr)
            }
        }
        catch (e) {
            throw new Error(`Unable to delete receipt: ${e}`)
        }
    }

    useEffect(() => {
        if (receipts.length === 0) {
            const fetchReceipts = async () => {
                const receipts = await getReceipts(user?.id as number, user?.receiptzToken as string)
                setReceipts(receipts)
            }
            fetchReceipts()
        }
    }, [])

    const handleEditClose = async () => {
        showEdit(null)
    }

    return (
        <>
            <ScrollView style={[t.wFull, t.pT4]} contentContainerStyle={[t.flex, t.itemsCenter]}>
                {receipts.map((r: Receipt, i: number) => <ReceiptListItem receipt={r} index={i} key={i} displayPreview={displayPreview} displayEdit={displayEdit} deleteReceipt={deleteReceipt} />)}
            </ScrollView>
            {(preview || edit) &&
                <View style={[t.wFull, t.hFull, t.bgBlack, t.opacity25, t.absolute, t.top0]} />
            }
            <Modal visible={!!preview || !!edit} transparent animationType='slide'>
                <KeyboardAvoidingView style={{ position: 'absolute', bottom: 0, width: '100%' }} behavior='padding'>
                    {preview &&
                        <ReceiptPreview receipt={preview as Receipt} onClose={() => showPreview(null)} />}
                    {edit &&
                        <ReceiptEdit index={edit.index} onClose={handleEditClose} receipts={receipts} setReceipts={setReceipts} />
                    }
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}
export default Receipts

interface IReceiptModal {
    receipt?: Receipt
    receipts?: Receipt[]
    setReceipts?: React.Dispatch<React.SetStateAction<Receipt[]>>,
    onClose: () => void
    index?: number
}
export const ReceiptPreview: React.FC<IReceiptModal> = ({ receipt, onClose }) => {
    const { user } = useContext(UserContext) as UserContext
    const [width, setWidth] = useState<number | undefined>()
    const [image, setImage] = useState<string | undefined>()

    useEffect(() => {
        if (receipt && receipt.imageUrl) {
            const getImage = async () => {
                const imageRef = ref(storage, receipt.imageUrl)
                const res = await getDownloadURL(imageRef)
                setImage(res)
            }
            getImage()
        }
    }, [])

    const formatDate = (d: Date): string => new Date(d).toDateString()

    if (!receipt) {
        return <></>
    }

    return (
        <BlurView blurAmount={1} style={{ borderRadius: 10, marginBottom: 20 }}>
            <View style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 6, paddingTop: 6, marginBottom: 5 }}>
                <TouchableOpacity onPress={onClose}>
                    <FontAwesomeIcon icon={faXmarkCircle} color='white' />
                </TouchableOpacity>
            </View>
            <View style={[t.flex, t.itemsCenter]}>
                <View style={[t.w3_4]}>
                    <View style={[t.wFull, t.bgWhite, t.flex]} onLayout={e => setWidth(e.nativeEvent.layout.width)}>
                        {typeof width == 'number' &&
                            <ZigzagLines
                                width={width}
                                height={5}
                                jagWidth={12}
                                backgroundColor="rgba(0, 0, 0, 0.75)"
                                color="#FFF"
                                position='top' />
                        }
                        <Text style={[t.textCenter, t.mY4, t.fontReceipt, t.text2xl, t.borderB2, t.borderBlack, t.mX2]}>{receipt.title}</Text>
                        <Text style={[t.mL5, t.mB4, t.fontReceipt]}>Created: {formatDate(receipt.createdAt)}</Text>
                        <View style={[t.flex, t.itemsCenter, t.mT2]}>
                            {receipt.imageUrl &&
                                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                            }
                        </View>
                        <View style={[t.mT4, t.mL5, t.mR10]}>
                            {receipt.claims?.map(((claim: string, i: number) => {
                                return (
                                    <View style={[t.flex, t.flexRow, t.mY1]} key={`receipt-preview-${i}`}>
                                        <Text style={[t.mR3, t.fontReceipt]}>1</Text>
                                        <Text style={[t.fontReceipt]}>{claim}</Text>
                                    </View>
                                )
                            }))}
                            <Text>-------------</Text>
                            {receipt.claims && receipt.claims.length > 0 && <Text style={[t.fontReceipt]}>Total: {receipt.claims.length}</Text>}
                        </View>
                        <View style={[t.mT2, t.mL5]}>
                            <Text style={[t.fontReceipt]}>Cardholder name: {receipt.accusee}</Text>
                        </View>
                        <View style={[t.mY5, t.flex, t.itemsCenter]}>
                            <Text style={[t.fontReceipt]}>Vendor:</Text>
                            <Text style={[t.fontReceipt]}>{user?.twitterName || 'Your Name'}</Text>
                        </View>
                        <View style={[t.mT6, t.mB4]}>
                            <Text style={[t.mX2, t.fontReceipt, t.textCenter]}>Processed by <Text style={[t.underline]}>Receiptz</Text>, the app to track bets, wagers, and absurd predictions</Text>
                        </View>
                        {typeof width == 'number' &&
                            <ZigzagLines
                                width={width}
                                height={5}
                                jagWidth={12}
                                backgroundColor="black"
                                color="#FFF"
                                position='bottom' />
                        }
                    </View>
                </View>
            </View>
        </BlurView>
    )
}

export const ReceiptEdit: React.FC<IReceiptModal> = ({ onClose, index, receipts, setReceipts }) => {
    const { user } = useContext(UserContext) as UserContext
    const { state } = useContext(ReceiptContext)
    const [step, setStep] = useState(0)

    const postUpdate = async () => {
        const data: ReceiptData = {
            id: state.id,
            title: state.title,
            accusee: state.accusee,
            claims: state.claims,
            collectionDate: new Date(state.collectDate).toISOString(),
            imageUrl: state.filename,
            userId: user?.id as number
        }
        const updatedReceipt = await updateReceipt(data, user?.receiptzToken as string)
        if (index && receipts && receipts.length && receipts.length > 0 && setReceipts) {
            const array = [...receipts]
            array[index] = updatedReceipt
            setReceipts(array)
        }
    }

    const incrementStep = async () => {
        await postUpdate()
        setStep((step + 1) % 6)
    }
    const decrementStep = async () => {
        await postUpdate()
        setStep((step - 1 + 6) % 6)
    }

    const handleClose = async () => {
        await postUpdate()
        onClose()
    }

    const ReceiptForm = () => {
        switch (step) {
            case 0:
                return <ReceiptTitle />
            case 1:
                return <ReceiptAccusee />
            case 2:
                return <ReceiptClaims />
            case 3:
                return <ReceiptUploadImage edit={true} />
            case 4:
                return <ReceiptCollectDate />
            case 5:
                return <ReceiptSave />
            default:
                return <ReceiptTitle />
        }
    }

    const MemoizedReceiptForm = useMemo(() => ReceiptForm, [step])

    return (
        <View style={[t.bgWhite, t.wFull, { height: 400, borderRadius: 10 }]}>
            <View style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 6, paddingTop: 6, marginBottom: 5 }}>
                <TouchableOpacity onPress={handleClose}>
                    <FontAwesomeIcon icon={faXmarkCircle} color='black' />
                </TouchableOpacity>
            </View>
            <View>
                <MemoizedReceiptForm />
                {/* FORM CONTROLS */}
                <View style={[t.wFull, t.flex, t.flexRow, t.justifyEvenly, t.itemsCenter, t.mT4]}>
                    <TouchableOpacity onPress={decrementStep} delayPressIn={0}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20} />
                    </TouchableOpacity>
                    {/* STEP STATUS */}
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', gap: 3 }}>
                        <FontAwesomeIcon icon={step === 0 ? faCircleDot : faCircle} size={8} color='black' secondaryColor='black' />
                        <FontAwesomeIcon icon={step === 1 ? faCircleDot : faCircle} size={8} />
                        <FontAwesomeIcon icon={step === 2 ? faCircleDot : faCircle} size={8} />
                        <FontAwesomeIcon icon={step === 3 ? faCircleDot : faCircle} size={8} />
                        <FontAwesomeIcon icon={step === 4 ? faCircleDot : faCircle} size={8} />
                        <FontAwesomeIcon icon={step === 5 ? faCircleDot : faCircle} size={8} />
                    </View>
                    <TouchableOpacity onPress={incrementStep} delayPressIn={0}>
                        <FontAwesomeIcon icon={faArrowRight} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}