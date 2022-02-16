/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import heroestdApi from 'api/heroestdApi'
import PaginationCustom from 'components/Pagination/Pagination'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const SalesHistory = ({ id }) => {
  const [historyList, setHistoryList] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  })

  const shortAddress = (address: string) => {
    if (!address) return ''
    const start = address.slice(0, 4)
    const end = address.slice(address.length - 4, address.length)
    return `${start}...${end}`
  }

  // const fetchSaleHistory = async (params: any = {}) => {
  //   const { page, limit } = pagination
  //   const customParams = {
  //     page: params.page || page,
  //     limit: params.limit || limit,
  //     tokenId: id,
  //   }
  //   try {
  //     const { data } = await heroestdApi.getSaleHistory(customParams)
  //     setPagination({
  //       page: data.page,
  //       limit: data.limit,
  //       total: data.totalDocs,
  //     })
  //     setHistoryList(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const fetchSaleHistory = useCallback(
    async (params: any = {}) => {
      const { page, limit } = pagination
      const customParams = {
        page: params.page || page,
        limit: params.limit || limit,
        tokenId: id,
      }
      try {
        const { data } = await heroestdApi.getSaleHistory(customParams)
        setPagination({
          page: data.page,
          limit: data.limit,
          total: data.totalDocs,
        })
        setHistoryList(data?.docs)
      } catch (error) {
        console.log(error)
      }
    },
    [id],
  )

  useEffect(() => {
    fetchSaleHistory()
  }, [fetchSaleHistory, id])

  const handleChagePage = ({ page }) => {
    const param = {
      page,
    }
    fetchSaleHistory(param)
  }

  return (
    <Card className="w-full">
      <h1 className="text-white font-bold text-2xl pb-3">Sales history</h1>
      <CardBody>
        <Table>
          <Thead>
            <StyleTr>
              <Th>id</Th>
              <Th>Seller</Th>
              <Th>Buyer</Th>
              <Th>Price</Th>
            </StyleTr>
          </Thead>
          <Tbody>
            {historyList.length > 0 &&
              historyList.map((item) => (
                <StyleTr>
                  <Td>{item?.id}</Td>
                  <Td>{shortAddress(item?.seller)}</Td>
                  <Td>{shortAddress(item?.buyer)}</Td>
                  <Td>{item?.price || ''}</Td>
                </StyleTr>
              ))}
          </Tbody>
        </Table>

        <PaginationCustom
          current={pagination.page}
          total={pagination.total}
          onChange={handleChagePage}
          pageSize={pagination.limit}
        />
      </CardBody>
    </Card>
  )
}

const CardBody = styled.div`
  position: relative;
  border: 2px solid #414145;
  border-radius: 4px;
  padding: 10px;
  min-height: 150px;
  max-height: 450px;
  overflow-y: scroll;
  background: #242424;
`

const Card = styled.div`
  margin: 10px;
`
const StyleTr = styled(Tr)`
  > Th,
  Td {
    text-align: center;
    color: #fff;
  }
`
export default SalesHistory
