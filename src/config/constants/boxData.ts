import { Address, IBoxConfig } from "config/constants/types"


const boxData: IBoxConfig[] = [
    {
        type: 'common',
        quantity: 1170,
        image: 'common_box.png',
        contractAddress: {
            56: "",
            97: "0xeaa01AcA7c8d394D50bed7957cA10027e7610e82"
        }
    },
    {
        type: 'rare',
        quantity: 1170,
        image: 'rare_box.png',
        contractAddress: {
            56: "",
            97: "0xFb964beAb13b3F1E26687573c7D6842e86298523"
        }
    },
    {
        type: 'legendary',
        quantity: 1170,
        image: 'legendary_box.png',
        contractAddress: {
            56: "",
            97: "0x48066e7Df98BeA3e6456A802234EE4fF2F1dA08D"
        }
    },
]

export default boxData