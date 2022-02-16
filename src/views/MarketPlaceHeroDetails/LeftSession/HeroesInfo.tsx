import React, { useState } from 'react'
import styled from 'styled-components'

export enum ITabTypes {
  ATTACK_SKILL = 2,
  HEROES = 0,
  ATTACK = 1,
  DEFENSE = 3
}

const HeroesInfo = ({heroConfig }) => {
  const customActiveTab = {
    borderColor: '#673AB7',
    color: "#FFAB04",
    borderBottom: "4px solid rgb(255, 99, 132)"
  }
  const [currentTab, setCurrentTab] = useState(0)

  const getCustomActiveTab = (index: number) => (currentTab === index ? customActiveTab : {})

  const onChangeCurrentTab = (index: number) => {
    setCurrentTab(index)
  }
  
  const renderBody = () => {
    switch (currentTab) {
      case ITabTypes.HEROES:
        return <div>
          <h1 className="className='w-full' text-white" > {heroConfig.story}  </h1>
        </div>
      case ITabTypes.ATTACK:
        return <div className='w-full' >
        <h1>To be updated</h1>
        <video _ngcontent-cts-c5="" autoPlay height="256px" loop src="assets/brandVfx.mp4" className="ng-star-inserted" />
      </div>
      case ITabTypes.ATTACK_SKILL:
        return <div className='w-full'>
        <h1>To be updated</h1>
      </div>
      default:
        return <div className='w-full'>
        <h1>To be updated</h1>
      </div>
    }
  }

  return (
    <Card >
      <div className="card-header" style={{ borderBottom: "1px solid #505050", fontSize: '16px',backgroundColor:"#000000" }}>
        <ul className="flex flex-row justify-start border-b">
          <li className=" lg:ml-5 md:ml-5 sm:ml-2 list-none sm:text-xs md:text-md lg:text-md">
            <NavLink
              key={0}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{ color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(0) }}
              onClick={() => onChangeCurrentTab(0)}
            >
              {heroConfig.name} 
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              key={1}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{ color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(1) }}
              onClick={() => onChangeCurrentTab(1)}
            >
              Attack
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              key={2}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{ color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(2) }}
              onClick={() => onChangeCurrentTab(2)}
            >
              Attack skill
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              key={2}
              className="inline-block sm:text-xs md:text-md lg:text-md"
              style={{ color: '#9E9E9E', fontWeight: 'bold', ...getCustomActiveTab(3) }}
              onClick={() => onChangeCurrentTab(3)}
            >
              Defense skill
            </NavLink>
          </li>
        </ul>
      </div>
      <CardBody className="text-white w-full" >
        {renderBody()}
      </CardBody>
    </Card>
  );
};

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
  height: 200px;
`

const NavLink = styled.div`
  padding: 8px;
  font-size: 16px;

  :hover {
    cursor: pointer;
    color: #0a58ca;
  }
`

const Card = styled.div`
  margin: 10px;
  width: 95%;
  @media screen and (max-width: 668px) {
    width: 95%;
  }
`

export default HeroesInfo;
