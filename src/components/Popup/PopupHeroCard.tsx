import { Button } from 'components/Pancake-uikit'
import React from 'react'
import {
    ButtonMenu,
    ButtonMenuItem,
    CloseIcon,
    Heading,
    IconButton,
    InjectedModalProps,
    ModalBody,
    ModalContainer,
    ModalTitle,
	Text,
    ModalHeader as UIKitModalHeader,
} from '@pancakeswap/uikit'
import styled, { keyframes } from 'styled-components'
import { Box } from '@mui/system'
import CardHero from 'components/CardHero/CardHero'
import { BaseHero } from 'components/CardHero/types'
import { StyleButton } from 'components/StyleDarkLand'

interface IPopupHero extends InjectedModalProps {
	heroDetail: BaseHero
}

const PopupHeroCard: React.FC<IPopupHero> = ({ heroDetail, onDismiss }) => {
    return(
        <ModalContainerCustom minWidth='auto' width='100%' maxWidth='685px'>
            <ModalHeader>
				<ModalTitle>
					<Heading fontSize='18px' color='#ccc'>
                        You have got a hero
                    </Heading>
				</ModalTitle>
				<IconButton variant="text" onClick={onDismiss}>
					<CloseIcon width="24px" color="text" />
				</IconButton>
			</ModalHeader>
            <ModalBodyCustom p="24px" maxWidth="685px" width="100%">
                <Box display='flex' gap={2} flexDirection='row' flexWrap='wrap' justifyContent="center">
                    <CardHero data={heroDetail.data}/>
                </Box>
                <Box style={{ position: 'sticky', bottom: 0 }}>
                    <StyleButton onClick={onDismiss} mt={3} width='100%'>Confirm</StyleButton>
                </Box>
			</ModalBodyCustom>
        </ModalContainerCustom>
    )
}

const ModalHeader = styled(UIKitModalHeader)`
    background: ${({theme}) => theme.colors.gradients.bubblegum};
`

const ModalBodyCustom = styled(ModalBody)`
    background: ${({theme}) => theme.colors.gradients.bubblegum};
` 

const ModalContainerCustom = styled(ModalContainer)`
    z-index: 999;
    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgb(255 169 14 / 10%);
        backdrop-filter: blur(5px);
        z-index: -1;
    }
`

const routeCard = keyframes`
    0% { opacity: 0; transform: rotateY(0deg); }
    100% { opacity: 1; transform: rotateY(360deg); }
`

const AnimateCard = styled(Box)`
    animation-name: ${routeCard};
    animation-duration: 1.5s;
    width: 100%;
    margin: 0 auto;
    position: relative;
`

const BadgeCustom = styled.span`
    position: absolute;
    top: -4px;
    right: 50%;
    transform: translate(50%, 0);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    background: linear-gradient(45deg, rgb(255, 174, 27), rgb(255, 102, 12));
    width: 44%;
    font-size: 11px;
    text-align: center;
    line-height: 11.5px;
    padding: 2px 5px;
`

const RarityColor = styled.span`
    color: ${( props ) => Number(props.color) === 1 ? '#C95EFB' : Number(props.color) === 2 ? '#E6AB58' : '#747475' }
`

export default PopupHeroCard