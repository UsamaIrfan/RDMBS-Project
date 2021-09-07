import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react';
import axios from "axios"
import { SERVER_API } from 'src/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { delProduct } from 'src/actions/ProductActions';
import moment from 'moment'

const Product = ({ match }) => {
  const history = useHistory()
  const [ShowSuccess, setShowSuccess] = React.useState(false)
  const [ShowFail, setShowFail] = React.useState(false)
  const [DeleteAlert, setDeleteAlert] = React.useState(false)
  const saleData = useSelector(state => state.sales)
  const [sale, setsale] = React.useState(saleData.find(sale => sale.Sale_Id.toString() === match.params.id))
  const saleDetails = sale ? Object.entries(sale) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    getSale()
  }, [])

  const dispatch = useDispatch()

  const deleteProduct = async (id) => {
    await dispatch(delProduct(id, setShowSuccess, setShowFail, history))
  }

  const getSale = () => {
    axios.get(`${SERVER_API}/api/getsaleId?id=${match.params.id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.data.success === true) {
          setsale(response.data.data[0])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <CRow>
      <SweetAlert
        warning
        showCancel
        show={DeleteAlert}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => { setDeleteAlert(false); deleteProduct(sale.product_id) }}
        onCancel={() => setDeleteAlert(false)}
        focusCancelBtn
      >
        You will not be able to recover this Product
      </SweetAlert>
      <SweetAlert
        success
        title={"Success"}
        show={ShowSuccess}
        onConfirm={() => {
          setShowSuccess(false)
          history.push("/products/allproducts")
        }}
      >
        Product Deleted
      </SweetAlert>
      <SweetAlert
        danger
        title={"Failed"}
        show={ShowFail}
        onConfirm={() => setShowFail(false)}
      >
        Unable to Delete Product
      </SweetAlert>
      <CCol lg={9}>
        <CCard>
          <CCardHeader style={{ justifyContent: "space-between", display: "flex" }}>
            Sale id: {match.params.id}
            <CRow className="align-items-center">
              <CCol col="6" sm="4" md="2" xl className="mb-1 mb-xl-0">
                <CButton block color="primary" className="d-xl-flex" onClick={() => history.push(`/sales/${match.params.id}/products`)}>Products</CButton>
              </CCol>
              <CCol col="6" sm="4" md="2" xl className="mb-1 mb-xl-0">
                <CButton block color="danger" onClick={() => setDeleteAlert(true)} className="col-12">Delete</CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  saleDetails.map(([key, value], index) => {
                    if (key === "Sale_date") {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{moment(value).format("LL")}</strong></td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    }
                  })
                }
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
