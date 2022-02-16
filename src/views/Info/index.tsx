import React from 'react'
import './styles.scss'
import styled from 'styled-components'
import Images from '../../assets/images'

const InfoScreen = () => {
  const viewImageStore = (image) => {
    return (
      <>
        <div className="infoScreen__Center__Left__Bottom__Round">
          <img src={image} className="infoScreen__Center__Left__Bottom__Image2" alt="Logo" />
        </div>
      </>
    )
  }

  const viewContentMiddle = (image, content) => {
    return (
      <>
        <div className="infoScreen__Middle__Item">
          <img src={image} alt="icon" />
          <p>{content}</p>
        </div>
      </>
    )
  }

  return (
    <div className="infoScreen">
      <div className="infoScreen__Top">
        <p className="infoScreen__Top__title">DotArcade app</p>
        <p className="infoScreen__Top__description">One-stop quick experience of DotArcade services</p>
      </div>
      {/* <div className="infoScreen__Center">
        <div className="infoScreen__Center__Left">
          <div className="infoScreen__Center__Left__Bottom">
            <div className="infoScreen__Center__Left__Bottom__One">
              <div className="infoScreen__Center__Left__Bottom__Round">
                <img src={Images.info.icQR} className="infoScreen__Center__Left__Bottom__Image1" alt="Logo" />
              </div>
            </div>
            <div className="infoScreen__Center__Left__Bottom__Two">
              {viewImageStore(Images.info.icAppstore)}
              {viewImageStore(Images.info.icCHPlay)}
            </div>
            <div className="infoScreen__Center__Left__Bottom__Three">
              {viewImageStore(Images.info.icTestflight)}
              {viewImageStore(Images.info.icAndroid)}
            </div>
          </div>
        </div>
        <div className="infoScreen__Center__Right">
          <img src={Images.info.icPhone1} className="infoScreen__Center__Right__iphone1" alt="iphone" />
          <img src={Images.info.icPhone2} className="infoScreen__Center__Right__iphone2" alt="iphone" />
        </div>
      </div> */}
      <Hero>
        <HeroLeft>
          <div
            style={{
              border: '8px solid #4072D3',
              borderRadius: '6px',
              width: 'fit-content',
              display: 'flex',
              alignContent: 'center',
              marginBottom: '20px',
            }}
          >
            <img src={Images.info.icQR} width="96px" alt="Logo" />
          </div>
          <DownloadSection>
            {viewImageStore(Images.info.icAppstore)}
            {viewImageStore(Images.info.icCHPlay)}
            {viewImageStore(Images.info.icAndroid)}
          </DownloadSection>
        </HeroLeft>

        <HeroRight>
          <img src="/bitback-phone.png" alt="" width="500px" />
        </HeroRight>
      </Hero>
      <div style={{marginBottom: '20px'}} className="infoScreen__Middle">
        {viewContentMiddle(Images.info.icInfo1, 'Provide DotArcade trading, currency price inquiry services')}
        {viewContentMiddle(
          Images.info.icInfo2,
          'Open up a special area to help DotArcade ecological access to more high-quality NFTs',
        )}
        {viewContentMiddle(
          Images.info.icInfo3,
          'Support BSC chain other NFT, Token transfer and transaction data viewing',
        )}
      </div>
      <div className="infoScreen__Bottom">
        <div className="infoScreen__Bottom__Top">
          <div className="infoScreen__Bottom__Top__Left">
            <img src="/phone1.png" alt="icon" />
          </div>
          <div className="infoScreen__Bottom__Top__Right">
            <p className="infoScreen__Bottom__Top__Right__title">One-stop experience KSHARK NFT function</p>
            <p className="infoScreen__Bottom__Top__Right__description">
              Quickly experience DotArcade NFT mining pool, blind box, minting, trading and other functions
            </p>
          </div>
        </div>
        <div className="infoScreen__Bottom__Bottom">
          <div className="infoScreen__Bottom__Bottom__Left">
            <p className="infoScreen__Bottom__Bottom__Left__title">BitBack Pool</p>
            <p className="infoScreen__Bottom__Bottom__Left__description">
              Stake DotArcade to earn new token. You can unstake at any time.
            </p>
          </div>
          <div className="infoScreen__Bottom__Bottom__Right">
            <img src="/phone2.png" alt="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}
const Hero = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const HeroLeft = styled.div`
  margin-top: 20px;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: start;
    width: 100%;
    & > * {
      margin-right: 40px;
    }
  }
`
const HeroRight = styled.div``
const DownloadSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export default InfoScreen
