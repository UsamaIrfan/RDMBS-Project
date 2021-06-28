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

const getBadge = status => {
    switch (status) {
        case 'In Stock': return 'success'
        case 'Out of Stock': return 'danger'
        default: return 'primary'
    }
}

const Products = ({ match }) => {
    const history = useHistory()
    const id = match.params.id
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const [products, setproducts] = useState([])
    const [NumberOfPages, setNumberOfPages] = useState(null)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/catagories/:id/products?page=${newPage}`)
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
        axios.get(`${SERVER_API}/api/getcatproducts?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    setproducts(response.data.List)
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

export default Products
