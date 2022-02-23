import React from 'react'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {Skeleton, Button} from 'components/Pancake-uikit'
import {formatNumber} from 'utils/formatBalance'
import {ChevronRightIcon, ChevronLeftIcon} from '@pancakeswap/uikit'

const TableSection = () => {
  return (
    <Table
      className="bg-black shadow"
      sx={{
        borderRadius: '8px',
        width: '100%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        maxWidth: '676px',
        margin: '0 auto'
      }}
      variant="simple"
    >
      <Thead
        sx={{
          th: {
            color: '#fff',
            textTransform: 'none',
            fontSize: '12px',
            borderColor: '#6C6C6C',
            borderWidth: '1px',
            textAlign: 'center',
          },
        }}
      >
        <Tr>
          <Th>No</Th>
          <Th>NFT id</Th>
          <Th>Wallet id</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody
        sx={{
          td: {
            fontSize: '12px',
            border: 'none',
            textAlign: 'center',
            padding: '5px',
          },
        }}
      >
        <Tr sx={{
          background: '#1D2D71',
          borderBottom: '8px solid #091749',
          borderTop: '8px solid #091749',
        }}>
          <Td>1</Td>
          <Td>#2356479</Td>
          <Td>0x36479...b897</Td>
          <Td>01/01/2022</Td>
        </Tr>
        <Tr sx={{
          background: '#1D2D71',
          borderBottom: '8px solid #091749',
          borderTop: '8px solid #091749',
        }}>
          <Td>2</Td>
          <Td>#2356479</Td>
          <Td>0x36479...b897</Td>
          <Td>01/01/2022</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

const PagButton = styled(Button)`
  background: #00BFD5;
  border-radius: 0;
  padding: 4px;
  height: 20px;
  width: 30px;
  font-size: 12px;
  margin: 0 5px;
  // &:hover {
  //   background: #00BFD5;
  // }
  &.active {
    background: #091749;
  }
`

const ClaimButton = styled(Button)`
  font-size: 12px;
  background: #FFA800;
  height: 25px;
  border-radius: 0;
  &:hover {
    background: rbga(255, 168, 0, 0.8);
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
  &:disabled {
    background: #1a202c;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

export default React.memo(TableSection)