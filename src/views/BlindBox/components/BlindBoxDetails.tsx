import React, {useEffect, useState, useCallback} from 'react'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Button, Heading, Text} from 'components/Pancake-uikit'
import {useTranslation} from 'contexts/Localization'
import styled from 'styled-components'

const BlindBoxDetails = (props) => {
  const {t} = useTranslation()
  return (
    <>
      <Hero {...props}>
        <Heading as="h1" size="xl" color="#ffffff">
          {t('Blind Box Details')}
        </Heading>
      </Hero>

      <TableResponsive>
        <TableDetails>
          <thead>
            <tr>
              <th>NFT</th>
              <th>Supply</th>
              <th>Hashrate</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="https://via.placeholder.com/46x46" alt="" /> <span>KShark Farmer</span>
              </td>
              <td>253</td>
              <td>100</td>
              <td>33.20%</td>
            </tr>
            <tr>
              <td>
                <img src="https://via.placeholder.com/46x46" alt="" /> <span>KShark Farmer</span>
              </td>
              <td>253</td>
              <td>100</td>
              <td>33.20%</td>
            </tr>
          </tbody>
        </TableDetails>
      </TableResponsive>
    </>
  )
}

const TableResponsive = styled.div`
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 27px 34px;
  border-radius: 14px;
  @media screen and (max-width: 991px) {
    padding: 0;
  }
`

const TableDetails = styled.table`
  width: 100%;

  thead {
    background: #f4f4f4;
    height: 46px;
    line-height: 46px;
    text-align: left;
    border-radius: 14px;

    th {
      padding-left: 19px;
      font-weight: 400;
    }

    th:first-child {
      border-radius: 14px 0 0 14px;
    }

    th:last-child {
      border-radius: 0 14px 14px 0;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #9797974f;
    }

    tr:last-child {
      border-bottom: none;
    }

    td {
      padding: 25px 19px;
      vertical-align: middle;

      img {
        border-radius: 14px;
      }
    }

    td:first-child {
      display: flex;
      align-items: center;
      gap: 12px;

      @media screen and (max-width: 991px) {
        width: 250px;
      }
    }
  }
`
export default BlindBoxDetails
