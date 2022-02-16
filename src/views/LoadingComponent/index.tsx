import React, {useMemo, useState, useEffect} from 'react'
import {RouteComponentProps} from 'react-router'
import styled from 'styled-components'
import {Hero} from 'components/KShark'
import Page from 'components/Layout/Page'
import {Button, Heading} from 'components/Pancake-uikit'
import {NavLink} from 'react-router-dom'
import {useTranslation} from 'contexts/Localization'
import {find} from 'lodash'
import './loadingComponent.modules.scss'

const LoadingComponent = () => {
  return (
    <div className="model-loading" style={{zIndex: 999, display: 'block', marginRight: 'auto', marginLeft: 'auto'}}>
      <div className="logo">
        <svg className="spinner" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  )
}

export default LoadingComponent
