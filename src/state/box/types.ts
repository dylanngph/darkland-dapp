export interface IBox {
    listsNFT: number[]
    isAllowance: boolean
}

export interface IBoxDetail {
    id: number
    label: string
    img: string
    title: string
    boxAddress: string
    balanceOf: number
}

export interface IBoxUser {
    balanceOf: number
    isApprovedForAll: boolean
    listBoxes: any
}