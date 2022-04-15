import {scales, variants} from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '40px',
    padding: '0 24px',
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px',
    borderRadius: '8px',
    fontSize: '14px',
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '12px',
    padding: '0 8px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'primary',
    color: 'white',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: 'primary',
    boxShadow: 'none',
    color: 'primary',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'tertiary',
    boxShadow: 'none',
    color: 'primary',
  },
  [variants.SUBTLE]: {
    backgroundColor: 'textSubtle',
    color: 'backgroundAlt',
  },
  [variants.DANGER]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'text',
    boxShadow: 'none',
  },
  [variants.PRIMARYDARK]: {
    backgroundColor: 'primaryDark',
    color: 'white',
  },
  [variants.CUSTOM]: {
    backgroundColor: 'custom',
    color: '#FD476A',
  },
  [variants.WARNING]: {
    backgroundColor: 'warning',
    color: 'white',
  },
}
