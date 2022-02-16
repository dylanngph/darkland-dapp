import React from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import HeroesMovement from './HeroesMovement'
import HeroesInfo from './HeroesInfo'

const HeroesDetailsLeftSession = ({id, heroesDetails, heroConfig }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Block>
        <HeroesMovement id={id} heroesDetails={heroesDetails} heroConfig={heroConfig} />
        <HeroesInfo heroConfig={heroConfig} />
      </Block>
    </div>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Block = styled.div`
  margin-bottom: 33px;
  display: flex;
  flex-direction: column;
`

export default HeroesDetailsLeftSession;
