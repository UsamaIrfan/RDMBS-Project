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
import axios from "axios";
import { SERVER_API } from 'src/actions/actionTypes';
import moment from 'moment';

const getBadge = status => {
    switch (status) {
        case 'In Stock': return 'success'
        case 'Out of Stock': return 'danger'
        default: return 'primary'
    }
}

const SaleProducts = ({ match }) => {
    const history = useHistory()
    const id = match.params.id
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const [products, setproducts] = useState([])
    const [NumberOfPages, setNumberOfPages] = useState(null)
    const [SaleProducts, setSaleProducts] = useState([])
    const [Total, setTotal] = useState(0)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/sales/:id/products?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    useEffect(() => {
        getInitialData()
    }, [])

    useEffect(() => {
        setNumberOfPages(products?.length > 0 ? Math.ceil(products.length / 10) : null)
    })

    const getInitialData = async () => {
        await getSaleProducts()
    }

    const calcTotal = (products) => {
        let total = 0
        products.forEach(i => total += i.sd_sellingPrice)
        setTotal(total)
    }

    const getProducts = async (payload) => {
        await axios.post(`${SERVER_API}/api/getmultiProducts`, payload,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    setproducts(response.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const getSaleProducts = async () => {
        await axios.get(`${SERVER_API}/api/sales/products?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    setSaleProducts(response.data.data)
                    calcTotal(response.data.data)
                    getProducts({ ids: response.data.data.map(i => i.sd_productId) })
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
                                { key: 'product_id', _classes: 'font-weight-bold' },
                                'product_name', 'register_date', 'parent_id', 'product_barcode'
                            ]}
                            hover
                            striped
                            itemsPerPage={10}
                            activePage={page}
                            clickableRows
                            onRowClick={(item) => history.push(`/products/${item.product_id}`)}
                            scopedSlots={{
                                'register_date':
                                    (item) => (
                                        <td>
                                            {moment(item).format("LL")}
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
            <CCol xl={3}>
                <h3 className="text-success text-center">Total</h3>
                <h2 className="text-center" color="#636f83">Rs: {Total}</h2>
            </CCol>
        </CRow>
    )
}

export default SaleProducts
