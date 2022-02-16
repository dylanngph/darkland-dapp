import { BoxType } from "./types"

const openBoxConfig = [
    {
        boxId: BoxType.COMMON,
        contractAddress: {
            97: "0xB6301e33C3B7e78Bde3e35BC15206C8C77929Ba3",
            56: "0x9b71D13b4c1d62a88FdEF7B19aD6201e51528283"
        }
    },
    {
        boxId: BoxType.RARE,
        contractAddress: {
            97: "0x86027C8fFaDC0ebB08ccfF1b70b133AD819B8CAa",
            56: "0x76265D4AcF9A58Ee4d53AeAc6E005fF942227Fd3"
        }
    },
    {
        boxId: BoxType.EPIC,
        contractAddress: {
            97: "0x6Fc3F1a09f96BF958f0EFB00726fd9fd739B286B",
            56: "0x269c99bb5aa2f1f0d8fab255eb0465d48c41c5b7"
        }
    },
    {
        boxId: BoxType.LEGENDARY,
        contractAddress: {
            97: "0xB20496a08aA2E25ceBEd41a50ae935daD0Df5346",
            56: "0x7ca2a3c30fC35B9322dA5870514Eb4daDc109918"
        }
    }
]

export default openBoxConfig