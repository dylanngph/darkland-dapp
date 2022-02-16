import heroNftConfig from "config/constants/heroNFT"
import heroNFTAbi from 'config/abi/heroNFT.json'
import BigNumber from "bignumber.js"
import { getAddress } from "./addressHelpers"
import { multicallv2 } from "./multicall"
import migrateAttributeHero from "./migrateAttributeHero"

const fetchAttributeHero = async(heroId: number) => {
    const calls = [{
        address: getAddress(heroNftConfig.contractAddress),
        name: 'baseHeroesAttribute',
        params: [heroId]
    },
    {
        address: getAddress(heroNftConfig.contractAddress),
        name: 'ownerOf',
        params: [heroId]
    }]

    const [attributeHero, [owner]] = await multicallv2(heroNFTAbi, calls)
    const attr = new BigNumber(attributeHero).toString()
    const migrateAttribute = migrateAttributeHero(attr)
    return {...migrateAttribute, tokenId: heroId, isLoaded: true, owner }
}

export const fetchAttributeHero2 = async(heroId: number) => {
    const calls = [{
        address: getAddress(heroNftConfig.contractAddress),
        name: 'baseHeroesAttribute',
        params: [heroId]
    }]

    const [attributeHero] = await multicallv2(heroNFTAbi, calls)
    const attr = new BigNumber(attributeHero).toString()
    const migrateAttribute = migrateAttributeHero(attr)
    return {...migrateAttribute, tokenId: heroId, isLoaded: true }
}

export default fetchAttributeHero