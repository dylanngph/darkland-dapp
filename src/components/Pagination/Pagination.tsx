import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import React from 'react'
import './pagination.scss'

interface Props {
  total: number
  simple?: boolean
  current: number
  onChange: any
  pageSize: number
}

const PaginationCustom: React.FC<Props> = (props) => {
  const onChange = (page) => {
    props.onChange({ page })
  }

  return (
    <div className="pagination-antd mb-10">
      <Pagination
        showTitle={false}
        className="pagination-antd__custom"
        {...props}
        onChange={onChange}
        hideOnSinglePage
        simple
      />
    </div>
  )
}

export default PaginationCustom
