import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import { isEqual } from 'lodash'
import history from 'routerHistory'
import { useHistory } from 'react-router-dom'
import HeroesCard from '.'

const ITEM_PER_PAGE = 48

const HeroesCardWrapper = ({ heroes }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(50)
  const [currentPosts, setCurrentPosts] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const path = useHistory()
  // const [currentItemsList, setCurrentItemsList] = useState([]);

  const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current as []
  }

  const heroesList = usePrevious(heroes)

  useEffect(() => {
    // Fetch items from another resources.
    if (!isEqual(heroesList, heroes)) {
      setItemOffset(0)
      setCurrentPage(0)
    }

    const currentItemOffset = isEqual(heroesList, heroes) ? itemOffset : 0
    const endOffset = currentItemOffset + ITEM_PER_PAGE
    if (heroesList) {
      setCurrentPosts(heroesList.slice(currentItemOffset, endOffset))
      setPageCount(Math.ceil(heroesList.length / ITEM_PER_PAGE))
    }
  }, [itemOffset, heroesList, heroes])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEM_PER_PAGE) % heroes.length
    setCurrentPage(event.selected)
    setItemOffset(newOffset)
  }

  const Items = ({ currentItems }) => {
    // if (currentItems.length > 0) {
    //   setCurrentItemsList(currentItems);
    // }
    return (
      <>
        {currentItems.length > 0 ? (
          <Container>
            <MarketHerosWrap>
              {currentItems?.map((hero: any) => (
                <RubyBlock
                  onClick={() => {
                    history.push( {pathname: `/heroes-details/${hero?._id}`, state:`${path.location.pathname}`})
                  }}
                  key={hero?._id}
                  className="flex flex-row flex-wrap cursor-pointer"
                >
                  {/* <HeroesCard hero={hero} /> */}
                </RubyBlock>
                
              ))}
            </MarketHerosWrap>
          </Container>
        ) : (
          <div />
        )}
      </>
    )
  }

  return (
    <>
      <Items currentItems={currentPosts || []} />
      <ReactPaginate
        nextLabel=">"
        forcePage={currentPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination w-full justify-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

const Container = styled.div`
  // height: calc(100vh - 225px);
  overflow-y: scroll;
  height: 75%;
  // overflow: hidden;
`

const MarketHerosWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 0 20px;
`

const RubyBlock = styled.div`
  // position: relative;
  // background-color: #0f0f0f;
  // flex-direction: column;
  // height: 100%;
  // width: auto;
  > div {
    transform: scale(0.55);
    border: unset;
    width: 150px;
    height: 205px;
    padding: 0 48px;
  }
  ::-webkit-scrollbar-track {
    background: #e24042;
  }
  &:hover {
    border-color: #aaaaaa;
  }
`

export default HeroesCardWrapper
