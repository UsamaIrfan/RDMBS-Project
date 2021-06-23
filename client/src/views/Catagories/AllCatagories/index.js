import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import catagoryData from './CatagoryData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCatagories } from 'src/actions/CatagoryActions'

const getBadge = status => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'danger'
    default: return 'primary'
  }
}

const AllCatagories = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const catagories = useSelector(state => state.catagories)
  const [NumberOfPages, setNumberOfPages] = useState(null)
  const dispatch = useDispatch()

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])


  useEffect(() => {
    getCatagories()
  }, [])

  useEffect(() => {
    setNumberOfPages(catagories?.length > 0 ? Math.ceil(catagories.length / 10) : null)
  })

  const getCatagories = async () => {
    await dispatch(getAllCatagories())
  }


  return (
    <CRow>
      <CCol xl={9}>
        <CCard>
          <CCardHeader>
            All Catagories
            <small className="text-muted"> Inventory</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={catagories}
              fields={[
                { key: 'categories_name', _classes: 'font-weight-bold' },
                'register_date', 'isActive'
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/catagories/${item.categories_id}`)}
              scopedSlots={{
                'isActive':
                  (item) => (
                    <td>
                      <CBadge color={getBadge(item.categories_isActive)}>
                      {item.categories_isActive}
                    </CBadge>
                    </td>
                  )
              }}
            />
            {NumberOfPages && <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={NumberOfPages}
              doubleArrows={false}
              align="center"
            />}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllCatagories
