import { OPEN_BOX } from "./box"
import { BoxType } from "./types"

const openBoxConfig = [
    {
        boxId: BoxType.COMMON,
        contractAddress: OPEN_BOX.MYSTERY
    },
    {
        boxId: BoxType.RARE,
        contractAddress: OPEN_BOX.PREMIUM
    },
]

export default openBoxConfig