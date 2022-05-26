import marketPlaceBoxAbi from 'config/abi/marketplaceBox.json'
import marketPlaceHeroAbi from 'config/abi/marketplaceHero.json'

export const marketplaceConfig = {
    contractAddress: {
        box: {
            97: "0x6522D56915d3FA4bc62a43c4FC488299c836e34F",
            56: "0xD0409C274014cde04F72Eb1DC8295CAdC3b7864e"
        },
        hero: {
            97: "0x6C95908561Ab1B1a468f7Ef183DB10401aA7D99A",
            56: "0x020FE1a2cB6bc57bfD16858ee8BfB6442cec8247"
        }
    },
    abi: {
        box: marketPlaceBoxAbi,
        hero: marketPlaceHeroAbi
    }
}