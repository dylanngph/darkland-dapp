import React, {useEffect, useState} from 'react'
import Page from 'components/Layout/Page'
import {Hero} from 'components/KShark'
import {Heading, Button, Box, useMatchBreakpoints} from 'components/Pancake-uikit'
import {RouteComponentProps, NavLink, Redirect} from 'react-router-dom'
import styled from '@emotion/styled'
import {Progress} from '@chakra-ui/react'
import idoConfig from 'config/constants/idos'
import {useWeb3React} from '@web3-react/core'
import {formatNumber} from 'utils/formatBalance'
import Tabs from './components/Tabs'
import {OpenTag, UpComing, Closed} from './components/Tags'
// import TabPacks from './components/packs/TabPacks'
import {fetchUserIsLockFree} from './hooks/fetchIDOFreeZone'
import {fetchUserIsLock} from './hooks/fetchIDO'
import Packs from './packs/Packs'
import PacksFree from './packs/PacksFree'

const IdoDetails = ({
  match: {
    params: {idoId},
  },
  history,
}: RouteComponentProps<{idoId?: string}>) => {
  const idoData = idoConfig.find((ido) => ido.id === Number(idoId))
  const {account} = useWeb3React()
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [idoDetails, setIdoDetails] = useState({
    isPaid: false,
    tokenAllowance: false,
    isClaim: false,
    balanceOf: 0,
    timeClaimIDO: 0,
    startTime: 0,
    endTime: 0,
    maxHardCap: 0,
    nowCap: 0,
    nowTotalUser: 0,
    endTimeStakeNFT: 0,
  })
  const {isXl} = useMatchBreakpoints()
  const isMobile = isXl === false

  const InfoLayout = styled(Box)`
    display: grid;
    grid-template-columns: ${!isMobile ? '60% 40%' : '100%'};
    gap: 20px;
    align-items: center;
  `
  const ItemBox = styled(Box)`
    background: #000;
    border-radius: 15px;
  `
  const PackLayout = styled(Box)`
    display: grid;
    grid-template-columns: ${isMobile ? '100%' : '33% 33% 33%'};
    gap: 10px;
    width: 100%;
  `

  useEffect(() => {
    const fetchDataIDO = async () => {
      if (account) {
        let data
        setIsLoading(true)
        if (idoData.type === 'vip') {
          data = await fetchUserIsLock(account, idoData.contractAddress, Number(idoId))
        } else {
          data = await fetchUserIsLockFree(account, idoData.contractAddress, Number(idoId))
        }
        setIdoDetails(data)
        setIsLoading(false)
      }
    }
    fetchDataIDO()
  }, [account, idoId, idoData, refresh])

  if (!idoData) return <Redirect to="/ido" />

  const isFree = idoData.type === 'free'
  const currentTime = Date.now()
  const startTime = idoData.startTime * 1000
  const endTime = idoData.endTime * 1000
  const isUpComing = startTime > currentTime
  const isStartTime = startTime < currentTime && currentTime < endTime
  const isClosed = currentTime > endTime
  const {title, description} = idoData
  const totalPercent = (idoDetails.nowCap / idoDetails.maxHardCap) * 100

  const StatusIDO = () => {
    // if (isUpComing) {
    // 	return <UpComing/>
    // }
    // if (isStartTime) {
    // 	return <OpenTag/>
    // }
    // if (isClosed) {
    // 	return <Closed/>
    // }
    return <Closed />
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          IDO
        </Heading>
        <Breadcrumb className="mt-3 mb-10">
          <li className="text-gray hover:text-white">
            <NavLink to="/ido">IDO</NavLink>
          </li>
          <li className="text-white">{title}</li>
        </Breadcrumb>
        <div className="md:flex gap-5">
          <ItemBox className="shadow md:w-2/3">
            <Subtitle width="100%" padding="20px" borderBottom="1px solid #424243">
              {title}
            </Subtitle>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
              }}
            >
              <div style={{color: '#89898B'}}>{description}</div>
              <img src={idoData.banner} className="h-72 object-cover" alt={idoData.title} width="100%" />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>IDO Status</div>
                <div>
                  {' '}
                  <StatusIDO />{' '}
                </div>
              </div>

              {isFree && (
                <ProgressBox>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: isMobile ? null : 'center',
                      justifyContent: isMobile ? null : 'space-between',
                      flexDirection: isMobile ? 'column' : null,
                      gap: isMobile ? '20px' : null,
                    }}
                  >
                    <div>
                      Total Cap: {formatNumber(idoDetails.nowCap)} / {formatNumber(idoDetails.maxHardCap)}{' '}
                      {idoData.tokenPrice.symbol}
                    </div>
                    <div>{Number.isNaN(totalPercent) ? 0 : totalPercent}%</div>
                  </div>
                  <Progress
                    sx={{
                      background: '#3E3E3E',
                      borderRadius: '7px',
                      '> *': {
                        borderRadius: '7px',
                        background: 'linear-gradient(127deg, rgba(253,71,106,1) 0%, rgba(224,61,68,1) 37%)',
                      },
                    }}
                    size="sm"
                    value={Number.isNaN(totalPercent) ? 0 : totalPercent}
                  />
                </ProgressBox>
              )}
            </div>
          </ItemBox>
          <ItemBox border="1px solid #424243" padding="20px" className="shadow md:w-1/3 mt-5 md:mt-0">
            <Tabs data={idoDetails} dataIDO={idoData} />
          </ItemBox>
        </div>
        <div className="md:flex gap-5">
          <div className="mt-5 md:w-2/3">
            {idoData.type === 'vip' ? (
              <Packs
                isMobile={isMobile}
                idoId={idoId}
                data={idoData}
                dataLocked={idoDetails}
                isLoading={isLoading}
                setRefresh={setRefresh}
              />
            ) : (
              <PacksFree
                isMobile={isMobile}
                idoId={idoId}
                data={idoData}
                dataLocked={idoDetails}
                isLoading={isLoading}
                setRefresh={setRefresh}
              />
            )}
          </div>
          <div className="md:w-1/3">{null}</div>
        </div>
      </Hero>
    </Page>
  )
}

const Breadcrumb = styled.ul`
  list-style: none;

  li {
    display: inline;
    font-size: 16px;
  }

  li + li:before {
    padding: 0 12px;
    color: #fff;
    content: '/';
  }
`
const Subtitle = styled(Box)`
  font-weight: 700;
  font-size: 18px;
`
const ProgressBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background: #272727;
`

export default IdoDetails
