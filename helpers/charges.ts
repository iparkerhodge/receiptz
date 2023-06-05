import { Reducer } from "react"

export interface ChargeState {
    title?: string
    dateCreated: string
    accusee?: string
    selectedImage?: string
    filename?: string
    charges: string[]
    collectDate: Date
}

export const chargeReducer: Reducer<ChargeState, ChargeStateAction> = (prevState: ChargeState, action: ChargeStateAction) => action.updateState(prevState)

export interface ChargeStateAction {
    updateState: ChargeStateUpdate
}

export type ChargeStateUpdate = (prevState: ChargeState) => ChargeState

export namespace Action {
    export class Title implements ChargeStateAction {
        title: string

        readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
            return { ...prevState, title: this.title }
        }

        constructor(title: string) {
            this.title = title
        }
    }
    export class Accusee implements ChargeStateAction {
        accusee: string

        readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
            return { ...prevState, accusee: this.accusee }
        }

        constructor(accusee: string) {
            this.accusee = accusee
        }
    }
    export class SelectedImage implements ChargeStateAction {
        selectedImage: string

        readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
            return { ...prevState, selectedImage: this.selectedImage }
        }

        constructor(selectedImage: string) {
            this.selectedImage = selectedImage
        }
    }
    export class Filename implements ChargeStateAction {
        filename: string

        readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
            return { ...prevState, filename: this.filename }
        }

        constructor(filename: string) {
            this.filename = filename
        }
    }
    export namespace Charges {
        export class AddCharge implements ChargeStateAction {
            // adds a new blank charge to show input
            readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
                const charges: string[] = prevState.charges
                charges.push("")
                return { ...prevState, charges: charges }
            }
        }
        export class UpdateCharge implements ChargeStateAction {
            index: number
            charge: string

            readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
                const charges = [...prevState.charges]
                charges[this.index] = this.charge
                return { ...prevState, charges: charges }
            }

            constructor(index: number, charge: string) {
                this.index = index
                this.charge = charge
            }
        }
        export class RemoveCharge implements ChargeStateAction {
            index: number

            readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
                console.log(this.index)
                const charges = [...prevState.charges]
                charges.splice(this.index, 1)
                return { ...prevState, charges: charges }
            }

            constructor(index: number) {
                this.index = index
            }
        }
    }
    export class CollectDate implements ChargeStateAction {
        date: Date

        readonly updateState: ChargeStateUpdate = (prevState: ChargeState) => {
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

export const initialChargeState: ChargeState = {
    title: 'Title',
    dateCreated: new Date().toDateString(),
    accusee: 'Person',
    selectedImage: undefined,
    filename: undefined,
    charges: ["Include the claims made here"],
    collectDate: initialCollectDate
}