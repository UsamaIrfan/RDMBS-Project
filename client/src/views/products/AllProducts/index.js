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
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from 'src/actions/ProductActions'

const getBadge = status => {
  switch (status) {
    case 'In Stock': return 'success'
    case 'Out of Stock': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const products = useSelector(state => state.products)
  const [NumberOfPages, setNumberOfPages] = useState(null)
  const dispatch = useDispatch()

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/products/allproducts?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setNumberOfPages(products?.length > 0 ? Math.ceil(products.length / 10) : null)
  })

  const getProducts = async () => {
    await dispatch(getAllProducts())
  }


  return (
    <CRow>
      <CCol xl={9}>
        <CCard>
          <CCardHeader>
            All Products
            <small className="text-muted"> Inventory</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={products}
              fields={[
                { key: 'product_name', _classes: 'font-weight-bold' },
                'register_date', 'parent_id', 'status'
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/products/${item.product_id}`)}
              scopedSlots={{
                'status':
                  (item) => (
                    <td>
                      <CBadge color={getBadge('In Stock')}>
                        {'In Stock'}
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

export default Users
