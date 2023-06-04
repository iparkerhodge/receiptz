import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faCircle, faCircleDot, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import ChargePreview from '../components/charges/ChargePreview';
import ChargeTitle from '../components/charges/steps/ChargeTitle';
import ChargeAccusee from '../components/charges/steps/ChargeAccusee';
import ChargeCharges from '../components/charges/steps/ChargeCharges';
import ChargeUploadImage from '../components/charges/steps/ChargeUploadImage';
import ChargeCollectDate from '../components/charges/steps/ChargeCollectDate';
import { Modal } from 'react-native';


const api = `http://127.0.0.1:3000`;


const AddCharge = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setModalOpen(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const handleModalClose = () => setModalOpen(false)

    const incrementStep = () => setStep((step + 1) % 5)
    const decrementStep = () => setStep((step - 1 + 5) % 5)

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
        <View style={[t.hFull, t.bgGray400, t.flex, t.itemsCenter, t.pT10]}>
            <TouchableOpacity onPress={() => setModalOpen(true)}>
                <ChargePreview />
            </TouchableOpacity>
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
                        <ChargeForm />
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
export default AddCharge