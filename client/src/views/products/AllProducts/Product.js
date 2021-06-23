import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react';
import axios from "axios"
import { SERVER_API } from 'src/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { delCatagory } from 'src/actions/ProductActions';

const Product = ({ match }) => {
  const history = useHistory()
  const [ShowSuccess, setShowSuccess] = React.useState(false)
  const [ShowFail, setShowFail] = React.useState(false)
  const [DeleteAlert, setDeleteAlert] = React.useState(false)
  const productData = useSelector(state => state.products)
  const [product, setproduct] = React.useState(productData.find(product => product.product_id.toString() === match.params.id))
  const productDetails = product ? Object.entries(product) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    getProduct()
  }, [])

  const dispatch = useDispatch()

  const deleteProduct = async (id) => {
    await dispatch(delCatagory(id, setShowSuccess, setShowFail, history))
  }

  const getProduct = () => {
    axios.get(`${SERVER_API}/api/getproduct?id=${match.params.id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.data.success === true) {
          setproduct(response.data.product)
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
        onConfirm={() => {setDeleteAlert(false); deleteProduct(product.product_id)}}
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
            Product id: {match.params.id}
            <CCol style={{ maxWidth: "120px", justifyContent: "flex-end", display: "flex" }} col="6" sm="4" md="2" className="mb-2 mb-xl-0">
              <CButton onClick={() => setDeleteAlert(true)} block color="danger">Delete</CButton>
            </CCol>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  productDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td><strong>{value}</strong></td>
                      </tr>
                    )
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
