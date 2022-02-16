import React, {useState} from 'react'
import Page from 'components/Layout/Page'
import {Hero} from 'components/KShark'
import {Heading, Button} from 'components/Pancake-uikit'
import {RouteComponentProps, NavLink, Redirect} from 'react-router-dom'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import {useTranslation} from 'contexts/Localization'
import {useCallWithGasPrice} from 'hooks/useCallWithGasPrice'
import {useBounty} from 'hooks/useContract'
import Detail from './Detail'
import {useGetBountyUser} from '../hooks/useFetchBounty'
import BountyInfo from './BountyInfo'

const BountyDetail = ({
  match: {
    params: {bountyId},
  },
  history,
}: RouteComponentProps<{bountyId?: string}>) => {
  const {t} = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const {state: bountiesData, isLoading} = useGetBountyUser(bountyId)
  const {toastSuccess, toastError} = useToast()
  const {callWithGasPrice} = useCallWithGasPrice()
  const bountyContract = useBounty(bountyId)

  if (bountiesData === undefined) return <Redirect to="/bounty" />

  const {taskSteps, title, linkTask, taskDesciptions, type} = bountiesData

  const handleClaim = async () => {
    try {
      setPendingTx(true)
      const tx = await callWithGasPrice(bountyContract, 'claimBounty', [])
      const receipt = await tx.wait()
      toastSuccess('Success', t(`You just claim a ${title} NFT.`))
    } catch (e) {
      console.log(e)
      toastError('Error', t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingTx(false)
    }
  }

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" color="#ffffff">
          Bounty NFT
        </Heading>
        <Breadcrumb className="mt-3 mb-10">
          <li className="text-gray hover:text-white">
            <NavLink to="/bounty">{t('Bounty NFT')}</NavLink>
          </li>
          <li className="text-white">{title}</li>
        </Breadcrumb>
      </Hero>
      <div className="md:flex gap-5">
        <div className="w-full md:w-2/3">
          <Detail data={bountiesData} isBounty handleClaim={handleClaim} pendingTx={pendingTx} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-1/3 mt-10 md:mt-0">
          <div className="bg-black rounded-xl shadow h-full">
            <div className="text-2xl p-5 text-white">Task steps</div>
            <div className="p-5">
              {/* <div className="text-red-400 mb-5">Tips: You must claim the task first and then buy $JOJO, otherwise you will not be able to get the NFT reward</div> */}
              {/* <div className="text-white">Task steps</div> */}
              {taskDesciptions.map((task, i) => (
                <p className="text-red-400 mb-3">{task}</p>
              ))}
              <div className="leading-10">
                {taskSteps.map((task, i) => (
                  <p key={task} className="text-white">
                    <span className="text-yellow-400">{i + 1}.</span> <span dangerouslySetInnerHTML={{__html: task}} />
                  </p>
                ))}
              </div>
            </div>
            <div className="p-5">
              {linkTask && (
                <a href={linkTask} target="_blank" rel="noreferrer">
                  <Button variant="primary" className="w-full">
                    Do task
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <BountyInfo type={type} />
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

export default BountyDetail
