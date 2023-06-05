import React, { Reducer, createContext, useEffect, useReducer, useState } from 'react'
import { ReceiptState, ReceiptStateAction, receiptReducer, initialReceiptState } from '../helpers/receipts'
import { Receipt } from '../types/types'

export interface IReceiptContext {
    state: ReceiptState
    dispatch: React.Dispatch<ReceiptStateAction>
    receipts: Receipt[]
    setReceipts: React.Dispatch<React.SetStateAction<Receipt[]>>
}

const initialReceiptContext = {
    state: initialReceiptState,
    dispatch: () => initialReceiptState,
    receipts: [] as Receipt[],
    setReceipts: () => []
}

export const ReceiptContext = createContext<IReceiptContext>(initialReceiptContext)

interface ReceiptProviderProps {
    children?: React.ReactNode
}

const ReceiptProvider: React.FC<ReceiptProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<ReceiptState, ReceiptStateAction>>(receiptReducer, initialReceiptState)
    const [receipts, setReceipts] = useState<Receipt[]>([])

    return (
        <ReceiptContext.Provider value={{ state, dispatch, receipts, setReceipts }}>
            {children}
        </ReceiptContext.Provider>
    )
}

export default ReceiptProvider