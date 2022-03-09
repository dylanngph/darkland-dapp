import React from 'react'
import {Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {Skeleton, Button} from 'components/Pancake-uikit'
import {formatNumber} from 'utils/formatBalance'
// import {ReactComponent as ArrowRightIcon} from 'assets/icons/ArrowRight.svg'
import {ChevronRightIcon, ChevronLeftIcon} from '@pancakeswap/uikit'

const TableSection = () => {
  // const {totalTokenLock, startTimeTGE, TGE_RELEASE, id, userIsClaimTGE, slug} = tgeData

  // const convertDate = (props: number) => new Date(props * 1000).toLocaleString()
  // const tgeDate = convertDate(startTimeTGE)

  return (
    <Table
      className="bg-black shadow"
      sx={{
        borderRadius: '8px',
        width: '100%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
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
          <Th>Name</Th>
          <Th>Date</Th>
          <Th>% Unlocked Token</Th>
          <Th>BIG Amount</Th>
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
        <Tr sx={{
          background: '#1D2D71',
          borderBottom: '8px solid #091749',
          borderTop: '8px solid #091749',
        }}>
          <Td>1</Td>
          <Td>TGE</Td>
          <Td>29.11.2021</Td>
          <Td>6%</Td>
          <Td>30.000</Td>
          <Td>
            <ClaimButton>
              Claim
            </ClaimButton>
          </Td>
        </Tr>
        <Tr sx={{
          background: '#1D2D71',
          borderBottom: '8px solid #091749',
          borderTop: '8px solid #091749',
        }}>
          <Td>2</Td>
          <Td>Private Sale</Td>
          <Td>29.11.2021</Td>
          <Td>6%</Td>
          <Td>30.000</Td>
          <Td>
            <ClaimButton>
              Claim
            </ClaimButton>
          </Td>
        </Tr>
        <Tr sx={{
          background: '#1D2D71',
          borderBottom: '8px solid #091749',
          borderTop: '8px solid #091749',
        }}>
          <Td>3</Td>
          <Td>Private Sale</Td>
          <Td>29.11.2021</Td>
          <Td>6%</Td>
          <Td>30.000</Td>
          <Td>
            <ClaimButton>
              Claim
            </ClaimButton>
          </Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Td colSpan={6} sx={{borderBottom: 0}}>
            <Flex>
              <PagButton>
                <ChevronLeftIcon />
              </PagButton>
              <PagButton className="active">1</PagButton>
              <PagButton>2</PagButton>
              <PagButton>
                <ChevronRightIcon />
              </PagButton>
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}

// const TableSection = ({tgeData, handleClaimTGE, pendingTx, stageData, handleClaimStage}) => {
//   const {totalTokenLock, startTimeTGE, TGE_RELEASE, id, userIsClaimTGE, slug} = tgeData

//   const convertDate = (props: number) => new Date(props * 1000).toLocaleString()
//   const tgeDate = convertDate(startTimeTGE)

//   return (
//     <Table
//       className="bg-black shadow"
//       sx={{
//         borderRadius: '8px',
//         width: '100%',
//       }}
//       variant="simple"
//     >
//       <TableCaption>Imperial to metric conversion factors</TableCaption>
//       <Thead
//         sx={{
//           th: {
//             color: '#fff',
//             textTransform: 'none',
//             fontSize: '12px',
//             borderColor: '#2D2B2B',
//             borderWidth: '2px',
//             textAlign: 'center',
//           },
//         }}
//       >
//         <Tr>
//           <Th>No#</Th>
//           <Th>Name</Th>
//           <Th>Date</Th>
//           <Th>% Unlocked Token</Th>
//           <Th>ADT Amount</Th>
//           <Th>Action</Th>
//         </Tr>
//       </Thead>
//       <Tbody
//         sx={{
//           td: {
//             fontSize: '12px',
//             border: 'none',
//             textAlign: 'center',
//             padding: '5px',
//           },
//         }}
//       >
//         {TGE_RELEASE > 0 ? (
//           <Tr>
//             <Td>{id}</Td>
//             <Td>{slug}</Td>
//             <Td>{tgeDate}</Td>
//             <Td>{TGE_RELEASE}%</Td>
//             <Td>{formatNumber((totalTokenLock * TGE_RELEASE) / 100)}</Td>
//             <Td>
//               <ClaimButton
//                 disabled={
//                   userIsClaimTGE ||
//                   pendingTx ||
//                   (totalTokenLock * TGE_RELEASE) / 100 === 0 ||
//                   startTimeTGE * 1000 > Date.now()
//                 }
//                 onClick={handleClaimTGE}
//               >
//                 {userIsClaimTGE ? 'Claimed' : 'Claim'}
//               </ClaimButton>
//             </Td>
//           </Tr>
//         ) : (
//           <Tr>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//           </Tr>
//         )}
//         {stageData.length > 0 ? (
//           stageData.map(
//             (entry: {id: number; startTime: number; stageRelease: number; stageClaimed: boolean}) => (
//               <Tr key={entry.id}>
//                 <Td>{entry.id + 1}</Td>
//                 <Td>Private Sale</Td>
//                 <Td>{convertDate(entry.startTime)}</Td>
//                 <Td>{entry.stageRelease}%</Td>
//                 <Td>{formatNumber((totalTokenLock * entry.stageRelease) / 100)}</Td>
//                 <Td>
//                   <ClaimButton
//                     disabled={entry.stageClaimed || pendingTx || !userIsClaimTGE || entry.startTime * 1000 > Date.now()}
//                     onClick={() => handleClaimStage(entry.id)}
//                   >
//                     {entry.stageClaimed ? 'Claimed' : 'Claim'}
//                   </ClaimButton>
//                 </Td>
//               </Tr>
//             ),
//           )
//         ) : (
//           <Tr>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//             <Td>
//               <Skeleton width="100%" />
//             </Td>
//           </Tr>
//         )}
//       </Tbody>
//     </Table>
//   )
// }

const PagButton = styled(Button)`
  background: transparent;
  border-radius: 0;
  padding: 4px;
  height: 20px;
  min-width: 20px;
  font-size: 12px;
  margin: 0 5px;
  &.active {
    background: #1D2D71;
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
