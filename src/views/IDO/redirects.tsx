import React from 'react'
import {Redirect, RouteComponentProps} from 'react-router-dom'
import IdoDetails from './IdoDetails'

const OLD_PATH_STRUCTURE = /[0-9a-zA-Z]$/
export function RedirectBountyWithId(props: RouteComponentProps<{idoId: string}>) {
  const {
    match: {
      params: {idoId},
    },
  } = props
  const match = idoId.match(OLD_PATH_STRUCTURE)
  if (match?.length === undefined) {
    return <Redirect to="/ido" />
  }
  return <IdoDetails {...props} />
}
