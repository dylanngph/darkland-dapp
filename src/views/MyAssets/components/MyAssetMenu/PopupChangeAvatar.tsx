import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@chakra-ui/react'
import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import {  AppBody } from '../../../../components/App'



export default ({ close, currentAva }) => {
  const { t } = useTranslation()
  const onClosePopup = () => {
    close()
  }

  const [avaErr, setAvaErr] = useState('');

  const [avatarSelected, setAvatarSelected] = useState(currentAva);

  const avatars = [
    {
      id: 1,
      name: 'BigBoss.gif',
      src: '../images/avatars/BigBoss.gif'
    },
    {
      id: 2,
      name: 'X.gif',
      src: '../images/avatars/X.gif'
    },
    {
      id: 3,
      name: 'Amuka.gif',
      src: '../images/avatars/Amuka.gif'
    },
    {
      id: 4,
      name: 'Anub.gif',
      src: '../images/avatars/Anub.gif'
    },
    {
      id: 5,
      name: 'Hunken.gif',
      src: '../images/avatars/Hunken.gif'
    },
  ]

  const onSetAvatar = () => {
    if (!avatarSelected) {
      console.log("Please choose avatar");
      setAvaErr('Please choose avatar')
    } else {
      setAvaErr('')
      localStorage.setItem('avatar', avatarSelected);
      close()
    }
  }

  return (
    <AppBody>
      <Box
        onClick={onClosePopup}
        style={{ top: '10px', right: '10px', position: 'absolute', cursor: 'pointer' }}
      >
        <img src="/close.svg" alt="close" />
      </Box>
      <Title>{t('Change avatar')}</Title>
      <ListAvatar className='flex-wrap' >
        {avatars.map((avatar) => {
          return <CardImg key={avatar.name}
            onClick={() => setAvatarSelected(avatar.name)} >
            <img style={avatarSelected === avatar.name ? { border: "2px solid red", borderRadius:"100%" } : { border: "none", borderRadius:"100%" }}
              className='h-20 w-20 cursor-pointer' src={avatar.src} alt={avatar.name} />
          </CardImg>
        })}
      </ListAvatar>
      <p> {avaErr} </p>
      <WrapButton>
        <Button style={{borderBottom: '3px solid #C16000', borderRadius: 0}} onClick={onSetAvatar} > Save change </Button>
      </WrapButton>
    </AppBody>
  )
}


const Title = styled(Box)`
  font-size: 21px;
  font-weight: 700;
  color: #fff;
`
// const ContainerPopupComplete = styled(Box)`
//   padding: 40px 30px;
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `

const CardImg = styled.div`
  padding: 10px;
`
// const SwapField = styled(Box)`
//   background: #272727;
//   color: #fff;
//   padding: 15px;
//   border-radius: 10px;
//   margin: 29px 0px;
// `

const ListAvatar = styled(Box)`
  display:flex;
  flex-direction: row;
  padding-top: 10px;
`

// const WrapCurrency = styled(Box)`
//   background: #151419;
//   border-radius: 8px;
//   display:flex;
//   flex-direction: row;
//   padding: 5px 0px;
//   width: 122px;
// `

const WrapButton = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
`