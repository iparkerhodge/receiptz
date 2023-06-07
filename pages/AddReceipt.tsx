import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faCircle, faCircleDot, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import ReceiptPreview from '../components/receipts/ReceiptPreview';
import ReceiptTitle from '../components/receipts/steps/ReceiptTitle';
import ReceiptAccusee from '../components/receipts/steps/ReceiptAccusee';
import ReceiptClaims from '../components/receipts/steps/ReceiptClaims';
import ReceiptUploadImage from '../components/receipts/steps/ReceiptUploadImage';
import ReceiptCollectDate from '../components/receipts/steps/ReceiptCollectDate';
import { Modal } from 'react-native';
import ReceiptSave from '../components/receipts/steps/ReceiptSave';


const api = `http://127.0.0.1:3000`;


const AddReceipt = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalOpen(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleModalClose = () => setModalOpen(false)

    const incrementStep = () => setStep((step + 1) % 6)
    const decrementStep = () => setStep((step - 1 + 6) % 6)

    const ReceiptForm = () => {
        switch (step) {
            case 0:
                return <ReceiptTitle />
            case 1:
                return <ReceiptAccusee />
            case 2:
                return <ReceiptClaims />
            case 3:
                return <ReceiptUploadImage />
            case 4:
                return <ReceiptCollectDate />
            case 5:
                return <ReceiptSave />
            default:
                return <ReceiptTitle />
        }
    }

    // TO DO: add error handling

    return (
        <View style={[t.hFull, t.bgBlack, t.flex, t.itemsCenter, t.pT10]}>
            <ScrollView style={[t.wFull]} contentContainerStyle={[t.flex, t.itemsCenter]}>
                <View style={[t.w3_4, t.flex, t.itemsCenter]}>
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={[t.wFull]}>
                        <ReceiptPreview />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {modalOpen &&
                <View style={[t.wFull, t.hFull, t.bgBlack, t.opacity25, t.absolute, t.top0]} />
            }
            <Modal visible={modalOpen} transparent={true} animationType='slide' onRequestClose={handleModalClose}>
                <KeyboardAvoidingView style={{ position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%', borderRadius: 10 }} behavior='padding'>
                    {/* CLOSE BUTTON */}
                    <View style={{ display: 'flex', alignItems: 'flex-end', paddingRight: 6, paddingTop: 6 }}>
                        <TouchableOpacity onPress={handleModalClose}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingBottom: 75 }}>
                        {/* FORM */}
                        <ReceiptForm />
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
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}
export default AddReceipt