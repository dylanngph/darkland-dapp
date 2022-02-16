import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "state"
import { Flex, Box } from "@chakra-ui/react"
import { Skeleton } from "@pancakeswap/uikit"
import heroConfig from 'config/constants/gameConfig/heroConfig.json'
import heroBaseStat from 'config/constants/gameConfig/heroBaseStat.json'

interface Props {
    idHero: any,
    heroesDetail: any,
    isNFT?: boolean
}

const EggDetails: React.FC<Props> = ({ idHero, heroesDetail, isNFT }) => {
    const { itemConfig, runeConfig } = useSelector((state: AppState) => state.common)
    // if (isNFT && heroesDetail.isLoaded === undefined || heroesDetail.heroId === -100) return (
    //     <Flex gridGap={5}>
    //         <div className="w-full md:w-3/6">
    //             <Skeleton mb={1}/>
    //             <Skeleton mb={1}/>
    //             <Skeleton/>
    //         </div>
    //         <div className="w-full md:w-3/6">
    //             <Skeleton mb={1}/>
    //             <Skeleton mb={1}/>
    //             <Skeleton/>
    //         </div>
    //     </Flex>
    // )
    return(
        <Box display={{ md: 'flex' }}>
            <div className="w-full md:w-3/6">
                {/* <HeroesDetailsLeftSession
                    id={idHero}
                    heroesDetails={heroesDetail}
                    heroConfig={heroConfig[heroesDetail.heroId - 1]}
                /> */}
            </div>
            <div className="w-full md:w-3/6">
                {/* {itemConfig && runeConfig && (
                    <HeroesDetailsRightSession
                    id={idHero}
                    heroesDetails={heroesDetail}
                    heroConfig={heroConfig[heroesDetail.heroId - 1]}
                    heroBaseStat={heroBaseStat[heroesDetail.heroId - 1]}
                    runeConfig={runeConfig}
                    itemConfig={itemConfig}
                    />
                )} */}
            </div>  
        </Box>
    )
}

EggDetails.defaultProps = {
    isNFT: false
}

export default React.memo(EggDetails)