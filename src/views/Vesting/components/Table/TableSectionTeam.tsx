import React from 'react'
import {Table, Thead, Tbody, Tr, Th, Td, TableCaption} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {Skeleton, Button} from 'components/Pancake-uikit'
import {formatNumber} from 'utils/formatBalance'

const TableSectionTeam = ({tgeData, pendingTx, stageData, handleClaimStage}) => {
  const {totalTokenLock, releasedClaim} = tgeData

  const convertDate = (props: number) => new Date(props * 1000).toLocaleString()

  return (
    <Table
      className="bg-black shadow"
      sx={{
        borderRadius: '8px',
        width: '100%',
      }}
      variant="simple"
    >
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead
        sx={{
          th: {
            color: '#fff',
            textTransform: 'none',
            fontSize: '12px',
            borderColor: '#2D2B2B',
            borderWidth: '2px',
            textAlign: 'center',
          },
        }}
      >
        <Tr>
          <Th>No</Th>
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>DAK Amount</Th>
          <Th>Action</Th>
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
        {stageData.length > 0 ? (
          stageData.map(
            (entry: {id: number; startTime: number; stageRelease: number; stageClaimed: boolean}) => (
              <Tr key={entry.id}>
                <Td>{entry.id}</Td>
                <Td>Team</Td>
                <Td>{convertDate(entry.startTime)}</Td>
                <Td>{formatNumber((totalTokenLock - releasedClaim) / entry.stageRelease)}</Td>
                <Td>
                  <ClaimButton
                    disabled={entry.stageClaimed || pendingTx || entry.startTime * 1000 > Date.now()}
                    onClick={() => handleClaimStage(entry.id)}
                  >
                    {entry.stageClaimed ? 'Claimed' : 'Claim'}
                  </ClaimButton>
                </Td>
              </Tr>
            ),
          )
        ) : (
          <Tr>
            <Td>
              <Skeleton width="100%" />
            </Td>
            <Td>
              <Skeleton width="100%" />
            </Td>
            <Td>
              <Skeleton width="100%" />
            </Td>
            <Td>
              <Skeleton width="100%" />
            </Td>
            <Td>
              <Skeleton width="100%" />
            </Td>
            <Td>
              <Skeleton width="100%" />
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}

const ClaimButton = styled(Button)`
  font-size: 12px;
  background: linear-gradient(127deg, rgba(253, 71, 106, 1) 0%, rgba(224, 61, 68, 1) 37%);
  &:hover {
    background: linear-gradient(127deg, rgba(253, 71, 106, 0.8) 0%, rgba(224, 61, 68, 0.8) 37%);
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
  &:disabled {
    background: #1a202c;
  }
`

export default React.memo(TableSectionTeam)
