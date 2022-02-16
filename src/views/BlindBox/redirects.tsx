import React from 'react'
import {Redirect, RouteComponentProps} from 'react-router-dom'
import BoxInfo from './components/BoxInfo'

export function RedirectToBlindBox() {
  return <Redirect to="/add/" />
}

const OLD_PATH_STRUCTURE = /^([0-9])$/
export function RedirectBoxInfoWithId(props: RouteComponentProps<{boxId: string}>) {
  const {
    match: {
      params: {boxId},
    },
  } = props
  const match = boxId.match(OLD_PATH_STRUCTURE)
  if (match?.length === undefined) {
    return <Redirect to="/blind-box" />
  }
  return <BoxInfo {...props} />
}
