import { Box, Flex } from "@pancakeswap/uikit"
import React from "react"
import styled from "styled-components"
import { formatNumber } from "utils/formatBalance"
import BackgroundCard from "./components/BackgroundCard"
import { CLASS, CLASS_IMG, RARITY, SKILL, TAG } from "./config"
import { BaseHero } from "./types"

const CardHero: React.FC<BaseHero> = ({ data: { classType, heroName, image, level, rarity, skill, star, tokenId, price } }) => {
	return(
		<BackgroundCard rarity={rarity} >
			<Flex height={25} justifyContent='space-between'>
				<TagID rarity={rarity}>
					<Box maxWidth='95%' margin='0 auto' style={{ color: '#fff', textAlign: "center" }}>#{tokenId}</Box>
				</TagID>
				<Level height='100%' mt='5px'>Level {level}</Level>
			</Flex>
			<Flex mt='15px' mx={3} justifyContent='space-between'>
				<Class rarity={rarity} name={CLASS_IMG[classType]} classType={classType} />
				<Skill skill={skill} />
			</Flex>
			<Box 
				backgroundImage={`url(${image})`}
				backgroundRepeat='no-repeat'
				backgroundPosition='center'
				backgroundSize='200px'
				height='100%'
				width='100%'
				style={{ position: 'absolute', top: -15, left: 0 }}
			/>
			<Box
				backgroundImage={`linear-gradient(${CLASS[rarity].secondary}00, ${CLASS[rarity].secondary})`}
				style={{
					position: 'absolute',
					left: 0,
					bottom: '60px',
					height: '50%',
					width: '94%',
					transform: 'translate(2%, 0)'
				}}
			/>
			<Flex mt='8.8rem' height='40px' mx={3} justifyContent='space-between' alignItems='end'>
				<Info star={star} heroName={heroName} />
				<Box style={{ fontSize: 38, zIndex: 1, fontWeight: 'bold', color: '#FFA800' }}>{TAG[rarity]}</Box>
			</Flex>
			{
				price !== undefined ?? <Flex alignItems='center' justifyContent='center' mt="21px" height="47px" mx={3} overflow="hidden">
					<Flex alignItems="center" style={{ gap: 5 }}>
						<img src="/images/coins/big.png" width={30} alt="token" />
						<Box style={{ fontWeight: 'bold', color: "#fff" }}>{ formatNumber(price) } BIG</Box>
					</Flex>
				</Flex>
			}
		</BackgroundCard>
	)
}

const TagID = ({ children, rarity }) => {
	return(
		<Box style={{ 
			clipPath: 'polygon(24% 0%, 100% 0%, 70% 130%, 4% 100%)', 
			lineHeight: '25px', 
			margin: '3px 0', 
			flex: 1.5	, 
			height: '100%', 
			fontSize: 12, 
			overflow: 'hidden',
			backgroundColor: RARITY[rarity]
		}}>
		{ children }
		</Box>
	)
}

const Class = ({ rarity, name, classType }) => {
	return (
		<Flex alignItems='center'>
			<Box style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', padding: 7, backgroundColor: CLASS[rarity].primary, position: 'relative' }}>
				<Box style={{ 
					clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', 
					backgroundColor: CLASS[rarity].secondary,
					height: '90%',
					width: '90%',
					position: 'absolute',
					top: '2px',
					left: '2px',
					zIndex: -1
				}} />
				<img src={`/images/hero/class/${CLASS_IMG[classType]}.png`} width={20} alt={CLASS_IMG[classType]} />
			</Box>
			<Box style={{ 
				fontWeight: 'bold', 
				padding: '0 15px', 
				backgroundImage: `linear-gradient(to right, ${RARITY[rarity]} , ${RARITY[rarity]}10)`, 
				marginLeft: '-10px', 
				height: 25, 
				lineHeight: '25px',
				fontSize: 14,
				color: "#fff"
			}}>
			{ name }
			</Box>
		</Flex>
	)
}

const Skill = ({ skill }) => {
	return(
		<Box style={{ border: '1px solid #fff', width: 32, height: 32, marginRight: 4 }}>
			<img src={`/images/hero/skills/${SKILL[skill].image}.png`} alt={SKILL[skill].name} />
		</Box>
	)
}

const Info = ({ star = 1, heroName }) => {
	return(
		<Flex flexDirection='column' alignItems='flex-start' style={{ zIndex: 1 }}>
			<Box mb={2} style={{ fontWeight: 'bold', textTransform: 'uppercase', color: "#fff" }}>{heroName}</Box>
			{ star ? <Flex position='relative'>
				<Flex style={{ opacity: 0.5 }}>
				{
					Array.from(Array(5)).map((_, index) => <Star key={_ + 1} />)
				}
				</Flex>
				<Flex position='absolute'>
				{
					Array.from(Array(star)).map((_, index) => <Star key={_ + 1}/>)
				}
				</Flex>
			</Flex> : null
			}
		</Flex>
	)
}

const Star = () => {
	return(<Box><img width={14} height={14} style={{ marginRight: 2 }} src='/images/hero/star.png' alt='star' /></Box>)
}

const Level = styled(Box)`
	flex: 1;
	line-height: 150%;
	font-weight: bold;
	text-align: right;
	margin-right: 20px;
	color: #fff;
`

export default CardHero