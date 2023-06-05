import React, { Reducer, createContext, useEffect, useReducer, useState } from 'react'
import { ChargeState, ChargeStateAction, chargeReducer, initialChargeState } from '../helpers/charges'

export interface IChargeContext {
    state: ChargeState
    dispatch: React.Dispatch<ChargeStateAction>
}

const initialChargeContext = {
    state: initialChargeState,
    dispatch: () => initialChargeState
}

export const ChargeContext = createContext<IChargeContext>(initialChargeContext)

interface ChargeProviderProps {
    children?: React.ReactNode
}

const ChargeProvider: React.FC<ChargeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<ChargeState, ChargeStateAction>>(chargeReducer, initialChargeState)

    return (
        <ChargeContext.Provider value={{ state, dispatch }}>
            {children}
        </ChargeContext.Provider>
    )
}

export default ChargeProvider