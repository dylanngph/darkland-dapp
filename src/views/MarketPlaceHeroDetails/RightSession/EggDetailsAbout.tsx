import React from 'react'
import styled from 'styled-components'

const EggDetailsAbout = ({ detailsAbout }) => {
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
    <Card className="w-full">
      <h1 className="text-white font-bold text-2xl pb-3">About</h1>
      <CardBody>
        <div className="flex flex-column flex-wrap p-2">
          <div className="w-full">
            <h1 className="text-header">Current Stake</h1>
            <div className="w-full rounded-full h-2.5 mt-1 mb-2" style={{backgroundColor:"#424243"}}>
              <div className="h-2.5 rounded-full" style={{width: "45%", backgroundColor: "#DA3754"}}/>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-white font-bold">Summoning</h1>
          </div>
          <div className="w-full">
            <h1 className="text-header">Owner</h1>
            <span
              style={{ textOverflow: 'ellipsis;' }}
              className="text-xs md:text-sm lg:text-md text-white font-bold"
            >
              {detailsAbout && splitAuthor()}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const CardBody = styled.div`
  background-color: #242424;
  position: relative;
  border: 2px solid #414145;
  padding: 15px 10px;
`

const Card = styled.div`
  margin: 10px;
`

export default EggDetailsAbout
