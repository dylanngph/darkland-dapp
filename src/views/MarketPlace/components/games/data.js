const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const idGenerate = () => {
  return Math.floor(1000 + Math.random() * 9000)
}

const staticData = [
  {
    id: '01',
    name: 'Number 1',
    price: idGenerate(),
    level: randomRange(1, 30),
    type: 'fire',
    attribute: {
      atk: 2,
      spd: 3,
      hp: 4,
    },
    img: '',
  },
  {
    id: '02',
    name: 'Number 2',
    price: idGenerate(),
    level: randomRange(1, 30),
    type: 'fire',
    attribute: {
      atk: 6,
      spd: 2,
      hp: 1,
    },
    img: '',
  },
  {
    id: '03',
    name: 'Number 3',
    price: idGenerate(),
    level: randomRange(1, 30),
    type: 'fire',
    attribute: {
      atk: 5,
      spd: 5,
      hp: 5,
    },
    img: '',
  },
  {
    id: '04',
    name: 'Number 4',
    price: idGenerate(),
    level: randomRange(1, 30),
    type: 'fire',
    attribute: {
      atk: 3,
      spd: 1,
      hp: 6,
    },
    img: '',
  },
]

export default staticData
