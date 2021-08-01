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
  CPagination,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CButton,
  CInput,
  CFormText,
  CFormGroup,
  CLabel,
  CDropdownToggle,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts, searchProducts } from 'src/actions/ProductActions'
import axios from "axios";
import { GET_PRODUCTS, SERVER_API } from 'src/actions/actionTypes'
import Loader from "../../../reusable/Loader";
import { motion } from "framer-motion"
import { getAllCatagories } from 'src/actions/CatagoryActions'

// Material
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'


const getBadge = status => {
  switch (status) {
    case 'In Stock': return 'success'
    case 'Out of Stock': return 'danger'
    default: return 'primary'
  }
}

const Products = () => {

  // HOOKS ===================>
  const history = useHistory()
  const dispatch = useDispatch()

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  // State ====================>
  const [page, setPage] = useState(currentPage)
  const [RangeValue, setRangeValue] = useState([])
  const [IsLoading, setIsLoading] = useState(true)
  const [RangeTimeline, setRangeTimeline] = useState([1999, 2001])
  const [NumberOfPages, setNumberOfPages] = useState(null)
  const [NUMBER_OF_PRODUCT_PER_SCREEN, setNUMBER_OF_PRODUCT_PER_SCREEN] = useState(10)
  const [SelectedCatagory, setSelectedCatagory] = useState()
  const [ProductsOrderBy, setProductsOrderBy] = useState("product_id")
  const [ShowSearch, setShowSearch] = useState(false)
  const [Keywords, setKeywords] = React.useState("")

  // Selectors =================>
  const products = useSelector(state => state.products)
  const catagories = useSelector(state => state.catagories)

  // Page Change Handler ===============>
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/products/allproducts?page=${newPage}`)
    getProducts((newPage - 1) * NUMBER_OF_PRODUCT_PER_SCREEN)
  }

  // Initial Number of pages and pages changing functions =====================>
  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  // Getting Initial Products and Product Timelines ========================>
  useEffect(() => {
    const unsubs = async () => {
      setIsLoading(true)
      await getProducts((currentPage - 1) * NUMBER_OF_PRODUCT_PER_SCREEN)
      await getProductsTimeline()
      await getCatagories()
      setIsLoading(false)
    }
    unsubs()
  }, [])

  // Calculating number of pages on every render ==================>
  useEffect(() => {
    setNumberOfPages(products?.length > 0 ? Math.ceil(products.length / NUMBER_OF_PRODUCT_PER_SCREEN) : null)
  })



  const getProducts = async (skipCount, add) => {
    await dispatch(getAllProducts(NUMBER_OF_PRODUCT_PER_SCREEN, skipCount, add))
  }

  const getCatagories = async () => {
    await dispatch(getAllCatagories())
  }


  // Server Calls Functions ====================>
  const getProductsTimeline = async () => {
    await axios.get(`${SERVER_API}/api/getProductsTimeline`,
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
  }

  // Range Input Change Handler
  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };

  const searchHandler = async () => {
    setIsLoading(true)
    await dispatch(searchProducts(RangeValue[0], RangeValue[1], SelectedCatagory?.value, ProductsOrderBy, Keywords))
    setIsLoading(false)
  }

  const removeFilters = () => {
    dispatch(searchProducts(RangeValue[0], RangeValue[1]))
    setSelectedCatagory(null)
    setProductsOrderBy("product_id")
  }

  // Main Render
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>

          <CCardHeader>
            <CRow className="row">
              <CCol xl={6}>
                All Products
                <small className="text-muted"> Inventory</small>
              </CCol>
              <CCol xl={3}>
                <CDropdown className="m-1">
                  <CDropdownToggle color="info">
                    Products Per Page: {NUMBER_OF_PRODUCT_PER_SCREEN}
                  </CDropdownToggle>
                  <CDropdownMenu onClick={(e) => setNUMBER_OF_PRODUCT_PER_SCREEN(e.target.text)} style={{ maxHeight: "250px", overflowY: "scroll" }}>
                    <CDropdownItem value={10} onClick={(e) => console.log(e.target.text)}>10</CDropdownItem>
                    <CDropdownItem value={20}>20</CDropdownItem>
                    <CDropdownItem value={30}>30</CDropdownItem>
                    <CDropdownItem value={40}>40</CDropdownItem>
                    <CDropdownDivider />
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
              <CCol xl={2}>
                <CCol col="6" sm="2" md="2" xl className="my-1 px-1">
                  <CButton style={{ display: "flex", justifyContent: "center" }} block color="info" onClick={() => setShowSearch(!ShowSearch)}><SearchIcon />{ShowSearch ? "Close" : "Search"}</CButton>
                </CCol>
              </CCol>
            </CRow>
          </CCardHeader>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={ShowSearch ? { opacity: 1, height: null } : { opacity: 0, height: 0 }}
          >
            <CFormGroup className="p-3" row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Search By</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput onSubmitCapture={searchHandler} value={Keywords} onChange={(e) => setKeywords(e.target.value)} id="text-input" name="text-input" placeholder="Enter Search Keywords" />
              </CCol>
            </CFormGroup>
            <CRow className="flex-row p-3">
              {RangeTimeline && <CCol xl={6}>
                <Typography>Filter By Year</Typography>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-labelledby="pretto slider"
                  value={RangeValue}
                  step={1}
                  min={2016}
                  max={2021}
                  onChange={handleChange}
                />
              </CCol>}
              <CCol xl={3} className="p-3">
                <CDropdown className="m-1">
                  <CDropdownToggle color="info">
                    {SelectedCatagory ? SelectedCatagory.text : "Flter By Catagory"}
                  </CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: "250px", overflowY: "scroll", }}>
                    {catagories?.map((item) => (
                      <CDropdownItem onClick={() => setSelectedCatagory({ value: item.categories_id, text: item.categories_name })} value={item.categories_id}>{item.categories_name}</CDropdownItem>
                    ))}
                    <CDropdownDivider />
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
              <CCol xl={3} className="p-3">
                <CDropdown className="m-1">
                  <CDropdownToggle color="info">
                    Order By
                  </CDropdownToggle>
                  <CDropdownMenu onClick={(e) => setProductsOrderBy(e.target.getAttribute("value"))} style={{ maxHeight: "250px", overflowY: "scroll" }}>
                    <CDropdownItem>Sales</CDropdownItem>
                    <CDropdownItem value="product_id">Product ID</CDropdownItem>
                    <CDropdownItem value="register_date">Register Date</CDropdownItem>
                    <CDropdownItem value="product_expiry">Expiry Date</CDropdownItem>
                    <CDropdownDivider />
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CRow>
            <CRow className="px-3">
              <CCol xl={3} className="mb-xxl-1 px-3">
                <CButton block color="primary" onClick={searchHandler} className="col-12">Search</CButton>
              </CCol>
              <CCol xl={3} className="mb-xxl-1 px-1">
                <CButton block color="light" onClick={() => removeFilters()} className="col-12">Remove Filters</CButton>
              </CCol>
            </CRow>
          </motion.div>
          <CCardBody>

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
          </CCardBody>
        </CCard>
      </CCol>
      {IsLoading && <Loader />}
    </CRow>
  )
}

export default Products


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