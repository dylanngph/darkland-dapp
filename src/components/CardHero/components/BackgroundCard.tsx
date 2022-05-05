import { Box } from "@pancakeswap/uikit"
import React from "react"
import { BACKGROUND } from "../config"

const BackgroundCard = ({ children, rarity }) => {
  return(
		<Box 
			backgroundImage={`url(/images/hero/background/${BACKGROUND[rarity].secondary}.png)`}
			width={230}
			height={321}
			backgroundRepeat='no-repeat'
			position='relative'
		>
			<Box
				backgroundImage={`url(/images/hero/background/${BACKGROUND[rarity].primary}.png)`}
				height='100%'
				width='100%'
				backgroundRepeat='no-repeat'
				backgroundPosition='3px 0'
				position='relative'
			>
				{ children }
			</Box>
		</Box>
	)
}

export default BackgroundCard