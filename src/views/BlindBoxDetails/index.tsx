import React, { useMemo, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import { Hero } from 'components/KShark'
import Page from 'components/Layout/Page'
import { Button, Heading } from 'components/Pancake-uikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { find, sample } from 'lodash'
import heroestdApi from 'api/heroestdApi'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { getAddress } from 'utils/addressHelpers'
import blindBoxItems from 'config/constants/blindBoxItems'
import { openBoxConfig } from 'config/constants/index'
import PopupHeroCard from 'components/Popup/PopupHeroCard'
import { BaseHero } from 'components/CardHero/types'
import { useBox, useOpenBox } from 'hooks/useContract'
import fetchAttributeHero from 'utils/getAttributeHero'
import useToast from 'hooks/useToast'
import { useFetchMyBox, useFetchOpenBox } from 'views/MyAssets/hooks/useFetchMysteryBox'
import { Flex, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import { Wrapper } from 'components/StyleDarkLand'
import BlindBoxDetailsInfoSection from './BlindBoxDetailsInfoSection'

const BlindBoxDetails = ({
  history,
  match: {
    params: { boxId },
  },
}: RouteComponentProps<{ boxId: string }>) => {
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const [approveTx, setApproveTx] = useState(false)
  const [openIframe, setOpenIframe] = useState(false)
  const [heroRes, setHeroRes] = useState<BaseHero>(null)
  const [dataAttr, setDataAttr] = useState({})
  const { toastError, toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  let blindBoxItem = find(blindBoxItems, (item) => item.id === Number(boxId));
  const openBoxAddress = find(openBoxConfig, (item) => item.boxId === Number(boxId))
  const [openModalHero] = useModal(<PopupHeroCard heroDetail={heroRes}/>, false)
  const myBoxes = useFetchMyBox();
  const{ isAllowance, listsNFT } = useFetchOpenBox(Number(boxId))
  let boxAddress = null
  if (myBoxes) {
    const currentBox = find(myBoxes, (item) => item.id === Number(boxId))
    boxAddress = currentBox.boxAddress
    blindBoxItem = {...blindBoxItem, balanceOf: currentBox.balanceOf }
  }

  const boxContract = useBox(Number(boxId))
  const openBoxContract = useOpenBox(Number(boxId))
  const handleApprove = async () => {
    try {
      setApproveTx(true)
      const tx = await callWithGasPrice(boxContract, 'setApprovalForAll', [getAddress(openBoxAddress.contractAddress), 'true'])
      const receipt = await tx.wait()
      toastSuccess('Success', 'You can open box now !')
    } catch (error) {
      toastError('Error', error?.data?.message)
      console.log(error)
    }
    finally {
      setApproveTx(false)
    }
  }

  const handleOpenBox = async() => {
    try {
      setPendingTx(true)
      const randomBox = sample(listsNFT);
      const tx = await callWithGasPrice(openBoxContract, 'openBoxAndClaimNFT', [boxAddress, randomBox])
      const receipt = await tx.wait()
      const heroId = receipt?.logs[3]?.topics[3]
      const heroData: any = await heroestdApi.getHeroAttribuse(Number(heroId).toString())
      const newData = {
        data: {...heroData, tokenId: heroData.seq_id, heroName: heroData.name}
      }
      setHeroRes(newData)
      // const heroId = 3403
      // const resultAttr = await fetchAttributeHero(Number(heroId))
      // setDataAttr(resultAttr)
      // setOpenIframe(true)
    } catch (error) {
      toastError('Error', error?.data?.message)
      console.log(error)
    }
    finally {
      setPendingTx(false)
    }
  }

  useEffect(() => {
    if (heroRes) {
      openModalHero()
      setHeroRes(null)
    }
  }, [heroRes, openModalHero])

  return (
    <Wrapper>
      <Flex flexDirection="column">
        <Flex>
          <Header>
            <Hero>
              <Heading as="h2" size="xl" color="#ffffff">
                <NavLink to="/my-assets">
                  <div className='flex'>
                    <img src='/images/marketplace/left-arrow.svg' alt='back' className='p-1' />
                    <p style={{ fontSize: "20px", paddingLeft: "16px" }} >
                      {t('Back')}
                    </p>
                  </div>
                </NavLink>
              </Heading>
            </Hero>
          </Header>
        </Flex>
        <Flex>
          <BlindBoxDetailsInfoSection 
            blindBoxItem={blindBoxItem} 
            boxId={boxId} 
            allowance={isAllowance} 
            onApprove={handleApprove}
            approveTx={approveTx}
            onOpen={handleOpenBox}
            pendingTx={pendingTx}
            setPendingTx={setPendingTx}
            dataAttr={dataAttr}
            openIframe={openIframe}
          />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Block = styled.div`
  margin-top: 44px;
  margin-bottom: 33px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Text = styled.div`
  font-size: 16px;
  color: #ffffff;
`

export default BlindBoxDetails
