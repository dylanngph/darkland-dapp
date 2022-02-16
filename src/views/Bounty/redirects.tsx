import React from 'react'
import {Redirect, RouteComponentProps} from 'react-router-dom'
import BountyDetail from './components/BountyDetail'

const OLD_PATH_STRUCTURE = /[0-9a-zA-Z]$/
export function RedirectBountyWithId(props: RouteComponentProps<{bountyId: string}>) {
  const {
    match: {
      params: {bountyId},
    },
  } = props
  const match = bountyId.match(OLD_PATH_STRUCTURE)
  if (match?.length === undefined) {
    return <Redirect to="/bounty" />
  }
  return <BountyDetail {...props} />
}
