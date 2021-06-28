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

import { getAllProducts, getProductsByTimeline } from 'src/actions/ProductActions'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import axios from "axios";
import { GET_PRODUCTS, SERVER_API } from 'src/actions/actionTypes'
import Loader from "../../../reusable/Loader";
import { motion } from "framer-motion"

const getBadge = status => {
  switch (status) {
    case 'In Stock': return 'success'
    case 'Out of Stock': return 'danger'
    default: return 'primary'
  }
}

const NUMBER_OF_PRODUCT_PER_SCREEN = 10;

const PrettoSlider = withStyles({
  root: {
    color: '#3C4B64',
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const Products = () => {

  // HOOKS ===================>
  const history = useHistory()
  const dispatch = useDispatch()

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  // State ====================>
  const [page, setPage] = useState(currentPage)
  const [RangeValue, setRangeValue] = useState([])
  const [IsLoading, setIsLoading] = useState(false)
  const [RangeTimeline, setRangeTimeline] = useState([1999, 2001])
  const [NumberOfPages, setNumberOfPages] = useState(null)

  // Selectors =================>
  const products = useSelector(state => state.products)

  // Page Change Handler ===============>
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/products/allproducts?page=${newPage}`)
  }

  // Initial Number of pages and pages changing functions =====================>
  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  // Getting Initial Products and Product Timelines ========================>
  useEffect(() => {
    getProducts()
    getProductsTimeline()
  }, [])

  // Calculating number of pages on every render ==================>
  useEffect(() => {
    setNumberOfPages(products?.length > 0 ? Math.ceil(products.length / NUMBER_OF_PRODUCT_PER_SCREEN) : null)
  })

  const getProducts = async () => {
    setIsLoading(true)
    await dispatch(getAllProducts())
    setIsLoading(false)
  }

  // Server Calls Functions ====================>
  const getProductsTimeline = async () => {
    setIsLoading(true)
    axios.get(`${SERVER_API}/api/getProductsTimeline`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(({ data }) => {
        if (data.success === true) {
          setRangeValue([parseInt(data.data.minYear), parseInt(data.data.maxYear)])
          setRangeTimeline([parseInt(data.data.minYear), parseInt(data.data.maxYear)])
        }
      })
      .catch((err) => {
        console.log(err)
      })
    setIsLoading(false)
  }

  const getProductsByTimeline = async (minYear, maxYear) => {
    setIsLoading(true)
    axios.get(`${SERVER_API}/api/getProductsByTimeline?minYear=${minYear}&maxYear=${maxYear}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(({ data }) => {
        if (data.success === true) {
          dispatch({
            type: GET_PRODUCTS,
            products: data.data,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    setIsLoading(false)
  }

  // Range Input Change Handler
  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
    getProductsByTimeline(newValue[0], newValue[1])
  };

  // Main Render
  return (
    <CRow>
      <CCol xl={9}>
        <CCard>
          <CCardHeader>
            All Sales
            <small className="text-muted"> Inventory</small>
          </CCardHeader>
          {RangeTimeline && <CCol xl={6} className="p-3">
            <Typography>Search</Typography>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-labelledby="pretto slider"
              value={RangeValue}
              step={1}
              min={2016}
              max={2021}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
          </CCol>}
          <CCardBody>
            <motion.div layout>

              <CDataTable
                items={products}
                fields={[
                  { key: 'product_name', _classes: 'font-weight-bold' },
                  'register_date', 'parent_id', 'status'
                ]}
                hover
                striped
                itemsPerPage={NUMBER_OF_PRODUCT_PER_SCREEN}
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
            </motion.div>
          </CCardBody>
        </CCard>
      </CCol>
      {IsLoading && <Loader />}
    </CRow>
  )
}

export default Products
