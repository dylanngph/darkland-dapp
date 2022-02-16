export const RARITY_CHECKBOX = {
  name: 'boxTypes',
  type: 'checkbox',
  data: [
    { name: '0', label: 'Common', icon: '', color: '' },
    { name: '1', label: 'Rare', icon: '', color: '#00A3FF' },
    { name: '2', label: 'Epic', icon: '', color: '#FFB800' },
    { name: '3', label: 'Legendary', icon: '', color: ' #FA00FF' },
  ],
}

export const BOXES_FILTER = [
  {
    type: 'select',
    label: '',
    name: 'seller',
    defaultValue: 0,
    options: [
      { key: 0, label: 'All orders' },
      { key: 1, label: 'My orders' },
    ],
  },
  {
    type: 'select',
    label: '',
    name: 'price',
    defaultValue: 0,
    options: [
      { key: 0, label: 'Newest' },
      { key: 2, label: 'Highest Price' },
      { key: 1, label: 'Lowest Price' },
    ],
  },
]

export const BOXES_CHECKBOX = [{ label: 'Rarity', value: RARITY_CHECKBOX }]
