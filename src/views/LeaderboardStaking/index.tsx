import React, {useState, useEffect} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Heading, Button} from 'components/Pancake-uikit'
import Loading from 'components/Loading'
import BigNumber from 'bignumber.js'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import {formatNumber} from 'utils/formatBalance'
import {useLpTokenPrice} from 'state/farms/hooks'
import {lpSymbol, BASE_URL_RANKING} from 'config/constants/topstaker'
import ReactPaginate from 'react-paginate'

interface PropsDataLeaderboard {
  totalFarm: number
  walletAddress: string
}

function Rewards(index) {
  let reward
  if (index === 1) {
    reward = <span>12 Mystery boxes</span>
  } else if (index >= 2 && index <= 5) {
    reward = <span>08 Mystery boxes</span>
  } else if (index >= 6 && index <= 20) {
    reward = <span>05 Mystery boxes</span>
  } else if (index >= 21 && index <= 50) {
    reward = <span>03 Mystery boxes</span>
  } else if (index >= 51 && index <= 100) {
    reward = <span>02 Mystery boxes</span>
  } else if (index >= 101 && index <= 300) {
    reward = <span>01 Mystery boxes</span>
  }

  return reward
}

const LeaderBoardStaking = () => {
  const [data, setData] = useState<PropsDataLeaderboard[]>(null)
  const [isLoading, setIsLoading] = useState(false)
  const lpPrice = useLpTokenPrice(lpSymbol)
  const ITEM_PER_PAGE = 20

  const [currentItems, setCurrentItems] = useState<PropsDataLeaderboard[]>(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const {data: result} = await fetch(`${BASE_URL_RANKING}/farm-event-leaderboard`).then((v) => v.json())
        const endOffset = itemOffset + ITEM_PER_PAGE
        setData(result)
        setPageCount(Math.ceil(result.length / ITEM_PER_PAGE))
        setCurrentItems(result.slice(itemOffset, endOffset))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [itemOffset, ITEM_PER_PAGE])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEM_PER_PAGE) % data.length
    setItemOffset(newOffset)
    const endOffset = itemOffset + ITEM_PER_PAGE
    setPageCount(Math.ceil(data.length / ITEM_PER_PAGE))
    setCurrentItems(data.slice(itemOffset, endOffset))
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          Top Farmers
        </Heading>
      </Hero>
      <div className="flex flex-col md:flex-row gap-5 wrap-leader-board">
        <Card className="md:w-2/3 leader-board-table">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <Table>
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Wallet Address</Th>
                  <Th>Total Staked</Th>
                  <Th>Rewards</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems &&
                  currentItems.map((d, i) => (
                    <Tr>
                      <Td className="rank">
                        <span
                          className={i + 1 + itemOffset <= 1 ? 'gold' : i + 1 + itemOffset <= 3 ? 'platinum' : 'silver'}
                        >
                          {i + 1 + itemOffset}
                        </span>
                      </Td>
                      <Td className="wallet-address">
                        <span>
                          {i + 1 + itemOffset <= 1 ? (
                            <img src="/images/gold.png" alt="gold" />
                          ) : i + 1 + itemOffset <= 3 ? (
                            <img src="/images/platinum.png" alt="platinum" />
                          ) : (
                            <img src="/images/silver.png" alt="silver" />
                          )}
                          {d.walletAddress}
                        </span>
                      </Td>
                      <Td className="price">
                        <span>${formatNumber(Number(new BigNumber(lpPrice)) * d.totalFarm)}</span>
                      </Td>
                      <Td className="reward">{Rewards(i + 1 + itemOffset)}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          )}
          {data > currentItems ? (
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="flex justify-center items-center paginate"
            />
          ) : (
            ''
          )}
        </Card>
        <Card className="md:w-1/3 info-leader">
          <div className="text-gray">
            <p>
              <strong>!!! YIELD FARMING STARTING WITH HUGE PRIZES INCREASE !!!</strong>
            </p>
            <p>
              <strong>TOTAL PRIZE OF THE CAMPAIGN IS 509 BLIND NFT BOXES WHEN STAKING $HTD/$BUSD</strong>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>
                There is a leaderboard based on the amount of $HTD in yield farming pool. Investors who ranked top in
                the leaderboard will get FREE Blind NFT boxes!
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>&nbsp;💎 Ranked 1st: 12 Blind NFT boxes FREE REWARD (1 prize)</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>🌟 Ranked 2-5: 08 Blind NFT boxes FREE REWARD (4 prizes)</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>✨ Ranked 6-20: 05 Blind NFT boxes FREE REWARD (15 prizes)</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>⭐️ Ranked 21-50: 03 Blind NFT boxes FREE REWARD(30 prizes)</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>⭐️ Ranked 51-100: 02 Blind NFT boxes FREE REWARD (50 prizes)</span>
            </p>
            <p>&nbsp;</p>
            <p>
              <span style={{fontWeight: 400}}>
                ⭐️ Ranked 101-300: 01 Blind NFT boxes FREE REWARD (200 prizes)&nbsp;
              </span>
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>SUPER PROFITABLE</strong>
            </p>
            <p>
              <span style={{fontWeight: 400}}>
                HTD holders can start yield farming with the pairs $HTD/ $BUSD to earn $HTD for different period 30 days
                and 180 days with the total awards of 468.000 HTD (0.1% total supply).
              </span>
            </p>
            <p>
              <span style={{fontWeight: 400}}>&nbsp;</span>
            </p>
            <p>
              <strong>TIMELINE</strong>
            </p>
            <p>
              <span style={{fontWeight: 400}}>Time to conclude leaderboard Pools: 15:00 (UTC) 08 December 2021</span>
            </p>
            <p>
              <span style={{fontWeight: 400}}>
                Time to claim Blind NFT boxes award: 13:00 (UTC)&nbsp; 10 December 2021
              </span>
            </p>
            <p>
              <span style={{fontWeight: 400}}>
                All investor can continue farming $HTD/$BUSD&nbsp; in Yield farming after the summary time.&nbsp;
              </span>
            </p>
          </div>
        </Card>
      </div>
    </Page>
  )
}

const Card = ({children, className}) => {
  return (
    <div className={`w-full h-full rounded-xl border border-gray-500 border-solid p-5 ${className}`}>{children}</div>
  )
}

export default LeaderBoardStaking
