import axios, { AxiosResponse } from "axios"
import { Reducer } from "react"
import { Receipt, User } from "../types/types"


// STATE
export interface ReceiptState {
    title: string
    dateCreated: string
    accusee: string
    selectedImage?: string
    filename?: string
    claims: string[]
    collectDate: Date
}

// REDUCER

export const receiptReducer: Reducer<ReceiptState, ReceiptStateAction> = (prevState: ReceiptState, action: ReceiptStateAction) => action.updateState(prevState)

export interface ReceiptStateAction {
    updateState: ReceiptStateUpdate
}

export type ReceiptStateUpdate = (prevState: ReceiptState) => ReceiptState

// REDUCER ACTIONS

export namespace Action {
    export class Title implements ReceiptStateAction {
        title: string

        readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
            return { ...prevState, title: this.title }
        }

        constructor(title: string) {
            this.title = title
        }
    }
    export class Accusee implements ReceiptStateAction {
        accusee: string

        readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
            return { ...prevState, accusee: this.accusee }
        }

        constructor(accusee: string) {
            this.accusee = accusee
        }
    }
    export class SelectedImage implements ReceiptStateAction {
        selectedImage: string

        readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
            return { ...prevState, selectedImage: this.selectedImage }
        }

        constructor(selectedImage: string) {
            this.selectedImage = selectedImage
        }
    }
    export class Filename implements ReceiptStateAction {
        filename: string

        readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
            return { ...prevState, filename: this.filename }
        }

        constructor(filename: string) {
            this.filename = filename
        }
    }
    export namespace Claims {
        export class AddClaim implements ReceiptStateAction {
            // adds a new blank claim to show input
            readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
                const claims: string[] = prevState.claims
                claims.push("")
                return { ...prevState, claims: claims }
            }
        }
        export class UpdateClaim implements ReceiptStateAction {
            index: number
            claim: string

            readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
                const claims = [...prevState.claims]
                claims[this.index] = this.claim
                return { ...prevState, claims: claims }
            }

            constructor(index: number, claim: string) {
                this.index = index
                this.claim = claim
            }
        }
        export class RemoveClaim implements ReceiptStateAction {
            index: number

            readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
                const claims = [...prevState.claims]
                claims.splice(this.index, 1)
                return { ...prevState, claims: claims }
            }

            constructor(index: number) {
                this.index = index
            }
        }
    }
    export class CollectDate implements ReceiptStateAction {
        date: Date

        readonly updateState: ReceiptStateUpdate = (prevState: ReceiptState) => {
            return { ...prevState, collectDate: this.date }
        }

        constructor(date: Date) {
            this.date = date
        }
    }
}

const initialCollectDate = new Date(2026, 1, 9)
initialCollectDate.setDate(initialCollectDate.getDate() + 1)

export default initialCollectDate

export const initialReceiptState: ReceiptState = {
    title: 'Title',
    dateCreated: new Date().toDateString(),
    accusee: 'Tag a Person',
    selectedImage: undefined,
    filename: undefined,
    claims: ["Include the claims made here"],
    collectDate: initialCollectDate
}

export interface ReceiptData {
    title: string
    accusee: string
    claims: string[]
    collectionDate: string
    imageUrl?: string
    userId: number
}

// REQUESTS

const api = `http://127.0.0.1:3000`

export const submitData = async (data: ReceiptData) => {
    const res = await axios.post<Receipt>(`${api}/receipts`, { receipt: data })
    return res
}