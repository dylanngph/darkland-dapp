import PaginationCustom from 'components/Pagination/Pagination'
import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { marketplaceConfig } from 'config/constants'
import { MarketplaceType } from 'config/constants/types'
import tokens from 'config/constants/tokens'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC20, useMarketplaceBox } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import {MaxUint256} from '@ethersproject/constants'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { getAddress } from 'utils/addressHelpers'
import { fetchListBoxes, setParamSearchBox } from 'views/MarketPlace/marketplaceSlice'
import Empty from 'components/Empty/Empty'
import BoxCardGrid from './BoxCardGrid'

interface Props {
  currentLayout: number
}

const MarketBox = ({ currentLayout }: Props) => {
  const dispatch = useAppDispatch()
  const { filterBoxes, boxesList, totalBox } = useSelector(
    (state: AppState) => state.marketplace,
  )

  const handleChagePage = ({ page }) => {
    const filterParams = { ...filterBoxes.params }
    filterParams.page = page
    dispatch(setParamSearchBox(filterParams))
  }

  const { account } = useWeb3React()
  const { toastError, toastSuccess } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [pendingTx, setPendingTx] = useState(false)
  const [purchasedTx, setPurchasedTx] = useState(false)
  const [cancelTx, setCancelTx] = useState(false)
  const marketplaceBoxContract = useMarketplaceBox(MarketplaceType.BOX)
  const tokenContract = useERC20(getAddress(tokens.busd.address))

  const handleCancel = async (orderId: number) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(marketplaceBoxContract, 'cancelSales', [orderId])
      const recpit = await tx.wait()
      toastSuccess('Success', 'Cancellation successful')
      setCancelTx(true)
      dispatch(fetchListBoxes(filterBoxes?.params))
    } catch (err) {
      toastError('Error', err?.data?.message)
      console.log(err)
    } finally {
      setPendingTx(false)
    }
  }

  const handleBuy = async (orderId: number) => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(marketplaceBoxContract, 'buy', [orderId])
      const recpit = await tx.wait()
      toastSuccess('Success', 'You\'ve successfully bought the NFT')
      setPurchasedTx(true)
      dispatch(fetchListBoxes(filterBoxes?.params))
    } catch (err) {
      toastError('Error', err?.data?.message)
      console.log(err)
    } finally {
      setPendingTx(false)
    }
  }

  const handleApprove = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(tokenContract, 'approve', [
        getAddress(marketplaceConfig.contractAddress.box),
        MaxUint256,
      ])
      const recpit = await tx.wait()
      toastSuccess('Success', 'Approval successful')
    } catch(err) {
      toastError('Error', err?.data?.message)
      console.log(err)
    } finally {
      setPendingTx(false)
    }
  }

  if (!boxesList?.length) return <Empty />

  return (
    <>
      <MarketBoxWrap id="market-box-id">
        {currentLayout === 0 &&
          boxesList.map((item) => {
            if (currentLayout === 0)
              return (
                <BoxCardGrid
                  key={item.id}
                  item={item}
                  pendingTx={pendingTx}
                  cancelTx={cancelTx}
                  setPurchasedTx={setPurchasedTx}
                  handleBuy={handleBuy}
                  handleCancel={handleCancel}
                  handleApprove={handleApprove}
                  setCancelTx={setCancelTx}
                  purchasedTx={purchasedTx}
                />
              )
            return null
          })}
        {/* {currentLayout === 1 && (
        <BoxCardList boxesList={boxesList} handlePurchaseBox={handleBuy} />
      )} */}
      </MarketBoxWrap>
      <PaginationCustom
        current={filterBoxes?.pagination.page}
        total={totalBox}
        onChange={handleChagePage}
        pageSize={filterBoxes.pagination.limit}
      />
    </>
  )
}

const Container = styled.div`
  height: calc(100vh - 260px);
  overflow-y: scroll;
`
const MarketBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`

export default memo(MarketBox)
