import { Button } from "components/Pancake-uikit";
import React, { useState, useEffect } from "react"
import { LotteryWinner } from "config/constants/LotteryWinners";
import styled from '@emotion/styled'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    InputGroup,
    InputLeftElement,
    Input
} from "@chakra-ui/react";
import ReactPaginate from 'react-paginate'
import {ReactComponent as TrophyIcon} from 'assets/icons/trophy.svg'
import {SearchIcon} from '@chakra-ui/icons'



interface PropsDataWinnerboard {
    address: string
    tickets: number
}

export default ({ close }) => {
//   useEffect(() => {
//     document.querySelector(".popup-overlay").addEventListener("click", close, true)
//   }, [close])
    const [data, setData] = useState<PropsDataWinnerboard[]>(null)
    const [query, setQuery] = useState('')
    const ITEM_PER_PAGE = 20

    const [currentItems, setCurrentItems] = useState<PropsDataWinnerboard[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            const result = LotteryWinner.filter(item => item.address.startsWith(query) || item.address.endsWith(query))
            const endOffset = itemOffset + ITEM_PER_PAGE;
            setData(result);
            setPageCount(Math.ceil(result.length / ITEM_PER_PAGE));
            setCurrentItems(result.slice(itemOffset, endOffset));
        }

        fetchData()
    }, [itemOffset, ITEM_PER_PAGE, query])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEM_PER_PAGE) % data.length;
        setItemOffset(newOffset);
        const endOffset = itemOffset + ITEM_PER_PAGE;
        setPageCount(Math.ceil(data.length / ITEM_PER_PAGE));
        setCurrentItems(data.slice(itemOffset, endOffset));
    };

    const convertAddress = (address:string) => {
        const result = `${address.slice(0,6)}...${address.slice(address.length - 5, address.length-1)}`
        return result
    }

  return (
    <Wrapper>
        <CloseButton type="button"  className="close" onClick={close}>
        &times;
        </CloseButton>
        <div className="flex flex-col md:flex-row gap-5 wrap-leader-board">
            <div className="md:w-2/3 flex flex-col gap-2">
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    // eslint-disable-next-line react/no-children-prop
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input
                        sx={{
                            borderColor: '#272727',
                            background: '#000',
                            borderRadius: '10px',
                        }}
                        focusBorderColor='#686868'
                        type='text'
                        placeholder='Input your wallet address'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </InputGroup>
                <Card className="leader-board-table">
                    
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>No #</Th>
                                <Th>Address</Th>
                                <Th>Tickets</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentItems.map((d, i) => 
                                <Tr>
                                    <Td >
                                        <TextBox>
                                            {i + 1 + itemOffset}
                                        </TextBox>
                                    
                                    </Td>
                                    <Td >
                                        <TextBox>
                                            {convertAddress(d.address)}
                                        </TextBox>
                                    </Td>
                                    <Td >
                                        <TextBox style={{color: '#FFC247'}}>{d.tickets} Tickets</TextBox>
                                    </Td>
                                </Tr>
                                )
                                
                            }
                        </Tbody>
                    </Table>
                    {
                        data > currentItems
                            ?
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
                            :
                            ""
                    }
                </Card>
            </div>
            <Card className="md:w-1/3 info-leader">
                <div className="text-gray">
                    <div className="flex items-center justify-between gap-1">
                        <TrophyIcon/>
                        <p style={{color: '#FFC247'}}><strong>LOTTERY WINNER ANNOUNCEMENT IN LUCKY DRAW EVENT TONIGHT</strong></p>
                    </div>
                
                    <p>&nbsp;</p>
                    <p><span style={{fontWeight: 400}}>
                    🎉🎉🎉 Congratulate to our great Holders, after staking 200 HTD/slot of lottery, all of you already had the Lottery Tickets. The winners will have a chance to claim the final tickets for the NFT box Purchase whitelist. The total number is up to 1025 tickets. Number of NFT box will be appear in your DApp.
                    </span></p>
                    
                </div>
            </Card>
        </div>
        
        
    </Wrapper>
  )
};

const Wrapper = styled.div`
    width: 90vw;
    height: 80vh;
    background: #151419;
    color: #fff;
    padding: 30px;
    overflow: auto;
    .leader-board-table td {
        padding: 10px;
        text-align: center;
    }
`
const CloseButton = styled(Button)`
    padding: 8px 10px;
    height: auto;
    position: absolute;
    top: -10px;
    right: -10px;
`
const Card = ({ children, className }) => {
    return <div style={{
        border: '1px solid #272727',
        background: '#000'
    }} 
    className={`w-full h-full rounded-xl p-5 ${className}`}
    >
        {children}
    </div>
}

const TextBox = styled.div`
    background: #151419;
    padding: 5px 10px;
    border-radius: 60px;
`