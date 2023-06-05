import React, { Reducer, createContext, useEffect, useReducer, useState } from 'react'
import { ReceiptState, ReceiptStateAction, receiptReducer, initialReceiptState } from '../helpers/receipts'

export interface IReceiptContext {
    state: ReceiptState
    dispatch: React.Dispatch<ReceiptStateAction>
}

const initialReceiptContext = {
    state: initialReceiptState,
    dispatch: () => initialReceiptState
}

export const ReceiptContext = createContext<IReceiptContext>(initialReceiptContext)

interface ReceiptProviderProps {
    children?: React.ReactNode
}

const ReceiptProvider: React.FC<ReceiptProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<ReceiptState, ReceiptStateAction>>(receiptReducer, initialReceiptState)

    return (
        <ReceiptContext.Provider value={{ state, dispatch }}>
            {children}
        </ReceiptContext.Provider>
    )
}

export default ReceiptProvider