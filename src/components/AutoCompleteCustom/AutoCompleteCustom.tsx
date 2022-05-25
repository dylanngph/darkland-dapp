import heroFaceImage from 'assets/heroImage'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { debounce } from 'lodash'
import { AppState } from 'state'

function AutoCompleteCustom({ handleOnChange, defaultValue }) {
  const { heroConfig } = useSelector((state: AppState) => state.common)

  useEffect(() => {
    const inputHeroSearch = document.querySelector('input')
    const onClearInput = () => {
      if (inputHeroSearch.value === '') handleOnChange('name')
    }
    const clearDebounce = debounce(onClearInput, 300)
    inputHeroSearch.addEventListener('keyup', clearDebounce)
    return () => {
      inputHeroSearch.removeEventListener('keyup', clearDebounce)
    }
  }, [handleOnChange])

  // const handleOnSearch = (string = '') => {
  //   if (string === '') {
  //     handleOnChange('name', string)
  //   }
  // }

  const onClear = () => {
    handleOnChange('name')
  }

  const list = []

  // const Items = heroConfig.reduce((pre, cur) => {
  //   list.forEach((item) => {
  //     if (item === cur.name) {
  //       console.log(cur)

  //       // pre.push(cur.name)
  //     }
  //   })
  //   return pre
  // }, [])

  // console.log(Items)

  const handleOnSelect = (item) => {
    handleOnChange('name', item?.name)
  }

  const formatResult = (item) => {
    const filterImage = list.find((i) => i.name === item)
    return (
      <div>
        <img
          src={filterImage.image}
          alt={filterImage.image}
          style={{
            display: 'inline',
            verticalAlign: 'middle',
            height: '40px',
            margin: '2px 10px',
            borderRadius: '5px',
            objectFit: 'contain'
          }}
        />
        {item}
      </div>
    )
  }

  return (
    <div style={{ width: 250 }}>
      <ReactSearchAutocomplete
        fuseOptions={{
          threshold: 0.2,
        }}
        inputSearchString={defaultValue.name || ''}
        items={list}
        // onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        onClear={onClear}
        formatResult={formatResult}
        placeholder="Hero Name"
        showIcon={false}
        inputDebounce={0}
        styling={{
          position: 'absolute',
          display: 'flex',
          WebkitFlexDirection: 'column',
          MsFlexDirection: 'column',
          flexDirection: 'column',
          width: '100%',
          height: '38px',
          border: '1px solid #00BFD5',
          borderRadius: '4px',
          backgroundColor: '#091749',
          color: '#fff',
          fontSize: '14px',
          zIndex: 2,
          hoverBackgroundColor: '#333',
        }}
      />
    </div>
  )
}

export default AutoCompleteCustom
