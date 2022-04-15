import { Address, IBoxConfig } from "config/constants/types"


const boxData: IBoxConfig[] = [
    {
        type: 'rare',
        quantity: 1170,
        image: 'common_box.svg',
        contractAddress: {
            56: "0xa431068C923828C876e54E958268ea0a878bFF5c",
            97: "0xeaa01AcA7c8d394D50bed7957cA10027e7610e82"
        }
    },
    {
        type: 'epic',
        quantity: 1170,
        image: 'rare_box.svg',
        contractAddress: {
            56: "0x00d751E3e01F50b34B3898701e55D3d42A14548f",
            97: "0xFb964beAb13b3F1E26687573c7D6842e86298523"
        }
    },
    {
        type: 'legendary',
        quantity: 1170,
        image: 'legendary_box.svg',
        contractAddress: {
            56: "0xE01E038aE6606AA5CE4bf6e79899ad28c70d8142",
            97: "0x48066e7Df98BeA3e6456A802234EE4fF2F1dA08D"
        }
    },
]

export default boxData