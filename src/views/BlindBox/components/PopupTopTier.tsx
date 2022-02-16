import React, {useState} from 'react'
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Button} from 'components/Pancake-uikit'
import styled from 'styled-components'
import history from 'routerHistory'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import useToast from 'hooks/useToast'
import {useClaimMysteryBox} from 'hooks/useContract'
import {useFetchMysteryBox} from '../hooks/useFetchMysteryBox'

const PopupTopTier = () => {
  const goToMyAssets = () => {
    const path = `/my-assets`
    history.push(path)
  }
  const [pendingTx, setPendingTx] = useState(false)
  const {toastSuccess, toastError} = useToast()
  const {callWithGasPrice} = useCallWithGasPrice()
  const claimBoxContract = useClaimMysteryBox()

  const mysteryBoxData = useFetchMysteryBox()

  const handleClaim = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(claimBoxContract, 'claimNFT', [])
      const receipt = await tx.wait()
      toastSuccess('Success', 'You just claimed mystery boxes')
    } catch (e) {
      console.log(e)
      toastError('Error', e?.data?.message)
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Container className="rounded-xl">
      <div className="flex justify-between flex-col h-full gap-3 w-full items-center">
        <img
          src={`
                ${
                  mysteryBoxData.userWhiteList
                    ? 'https://cdn.heroestd.io/Images/MysteryBanner.png'
                    : 'https://cdn.heroestd.io/Images/MysterNoTopTier.png'
                } 
                `}
          alt=""
          className="h-96 rounded-xl shadow"
        />
        {/* <Swiper
                    resizeObserver
                    className="w-full"
                    navigation
                    loop
                    autoplay
                >
                    <SwiperSlide>
                        <img src="https://cdn.heroestd.io/Images/Dapp_OpenBOX.png" className="h-full m-auto" alt="TopTier" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube-nocookie.com/embed/AARM4NWeFv4?controls=0" 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        />
                    </SwiperSlide>
                </Swiper> */}
        <div className="flex md:justify-center gap-5 justify-center">
          Your Mystery Boxes: {mysteryBoxData.userAmountTicket ?? 0}
        </div>
        {/* {
                    mysteryBoxData.userAmountTicket === 0 && mysteryBoxData.userWhiteList ?
                    <div className="flex md:justify-center gap-5 justify-center">
                        <span style={{color: '#ffab04'}}>You were claimed!</span>
                    </div>
                    : null
                } */}

        <div className="flex md:justify-center gap-5 justify-between">
          {mysteryBoxData.userWhiteList && mysteryBoxData.userAmountTicket > 0 ? (
            <Button disabled={pendingTx} onClick={() => handleClaim()}>
              {pendingTx ? 'Processing...' : 'Claim!'}
            </Button>
          ) : (
            <Button onClick={() => goToMyAssets()}>Go to My Asset</Button>
          )}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 1400px;
  max-height: 1000px;
`

export default PopupTopTier
