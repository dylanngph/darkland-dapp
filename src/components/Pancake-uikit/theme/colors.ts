import {Colors} from './types'

export const baseColors = {
  failure: '#ED4B9E',
  primary: '#F09E00',
  primaryBright: '#9BBAFF',
  primaryDark: '#4072D3',
  secondary: '#FFC247',
  success: '#38CB89',
  warning: '#FFA800',
  custom: 'linear-gradient(180deg, #292929 0%, #131313 100%)',
}

export const additionalColors = {
  binance: '#F0B90B',
  overlay: 'linear-gradient(232.96deg, #5E5D5D 1.65%, #3C393A 99.16%)',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
}

export const customColors = {
  backgroundMenu: '#0f0f0f',
}

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  background: '#fff',
  backgroundMenu: '#fff',
  backgroundDisabled: '#C0C0C0',
  backgroundAlt: '#edf0f5',
  cardBorder: '#FFFFFF',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#E4E7EB',
  tertiary: '#fff',
  text: '#333',
  textDisabled: '#8b8b8b',
  textSubtle: '#000',
  disabled: '#E9EAEB',
  gradients: {
    bubblegum: 'white',
    inverseBubblegum: 'white',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
    red: 'linear-gradient(180deg,#fff 0%,#ffe1e1 100%)',
  },
  backgroundTab: '#FAFBFC',
  textTab: '#8A94A6',
  borderTab: '#E4E7EB',
}

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  secondary: '#9A6AFF',
  background: '#272727',
  backgroundMenu: '#0f0f0f',
  backgroundDisabled: '#3c3742',
  backgroundAlt: '#091749',
  cardBorder: '#00BFD5',
  contrast: '#FFFFFF',
  dropdown: '#091749',
  dropdownDeep: '#1A2B6D',
  invertedContrast: '#191326',
  input: '#1A2B6D',
  inputSecondary: '#262130',
  tertiary: '#202020',
  text: '#ffffff',
  textDisabled: '#FFFFFF',
  textSubtle: '#fff',
  disabled: '#524B63',
  gradients: {
    bubblegum: '#091749',
    inverseBubblegum: 'linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)',
    // cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    cardHeader: '#091749',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
    red: 'linear-gradient(180deg,#000000 0%,#1a0000 100%)',
  },
  backgroundTab: '#FAFBFC',
  textTab: '#8A94A6',
  borderTab: '#E4E7EB',
}
