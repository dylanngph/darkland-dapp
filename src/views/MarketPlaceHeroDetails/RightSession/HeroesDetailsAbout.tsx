import React from 'react'
import styled from 'styled-components'

const HeroesDetailsAbout = ({ detailsAbout }) => {
  const date = detailsAbout?.dob
  const author = detailsAbout?.author
  const splitAuthor = () => {
    if (author && author.length > 40) {
      const positionSubString = 20
      const result = author.substring(0, positionSubString)
      const result2 = author.substring(author.length - 4, author.length)

      return `${result}...${result2}`
    }
    return author
  }

  return (
    <Card className="w-full" >
      <h1 className="text-white font-bold text-2xl pb-3">About</h1>
      <CardBody >
        <div className="flex flex-row flex-wrap justify-between p-2" >
          <div>
            <h1 className="text-header font-bold">DOB</h1>
            <span className="text-white font-bold">{date ? date.split('T')[0] : '28/12/2021'}</span>
          </div>
          <div>
            <h1 className="text-header font-bold">Summon times</h1>
            <span className="text-white font-bold">{detailsAbout ? detailsAbout?.fusionTime : '0'}</span>
          </div>
          <div>
            <h1 className="text-header font-bold">Authorize</h1>
            <span style={{textOverflow:"ellipsis;"}}
            className="text-xs md:text-sm lg:text-md text-white font-bold">{detailsAbout && splitAuthor()}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
`

const Card = styled.div`
  margin: 10px;
`

export default HeroesDetailsAbout;
