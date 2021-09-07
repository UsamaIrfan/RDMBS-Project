import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react';
import axios from "axios"
import { SERVER_API } from 'src/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { delProduct } from 'src/actions/ProductActions';
import JsBarcode from 'jsbarcode';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import BarCode from 'src/reusable/BarCode';
import ImageSlider from 'src/reusable/Slider';

const Product = ({ match }) => {
  const history = useHistory()
  const [ShowSuccess, setShowSuccess] = React.useState(false)
  const [ShowFail, setShowFail] = React.useState(false)
  const [ShowBarcode, setShowBarcode] = React.useState(false)
  const [DeleteAlert, setDeleteAlert] = React.useState(false)
  const [productDetailObject, setproductDetailObject] = React.useState([])
  const productData = useSelector(state => state.products)
  const [product, setproduct] = React.useState(productData.find(product => product.product_id.toString() === match.params.id))

  const componentRef = React.useRef();

  const productDetails = product ? Object.entries(product) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    getProduct()
  }, [])

  const dispatch = useDispatch()

  const deleteProduct = async (id) => {
    await dispatch(delProduct(id, setShowSuccess, setShowFail, history))
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

  const removeProductImage = (imagePath) => {
    setproduct({ ...product, images: product.images.filter(image => image.filePath !== imagePath) })
  }

  return (
    <CRow>
      <SweetAlert
        info
        title="Print Reciept!"
        onConfirm={() => setShowBarcode(false)}
        onCancel={() => setShowBarcode(false)}
        dependencies={[product?.product_name, product?.pp_sellingPrice, product?.product_barcode]}
        closeOnClickOutside={false}
        show={ShowBarcode}
        customButtons={
          <React.Fragment>
            <CButton className="btn btn-info  ml-1 mr-1 col-12" onClick={() => { setShowBarcode(false); }}>Confirm</CButton>
          </React.Fragment>
        }
      >
        <BarCode ProductBarcode={product?.product_barcode} name={product?.product_name} price={product?.pp_sellingPrice} />
      </SweetAlert>
      <SweetAlert
        warning
        showCancel
        show={DeleteAlert}
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => { setDeleteAlert(false); deleteProduct(product.product_id) }}
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
      <CCol lg={9} sm="12">
        <CCard>
          <CCardHeader style={{ justifyContent: "space-between", display: "flex" }}>
            Product id: {match.params.id}
            <CCol md="6" sm="12" xl="8" xxl="8" lg="8" row className="d-flex justify-content-end">
              <CCol lg="4" className="mb-2 mb-xl-0">
                <CButton onClick={() => setShowBarcode(true)} block color="info">Print Barcode</CButton>
              </CCol>
              <CCol lg="4" className="mb-2 mb-xl-0">
                <CButton onClick={() => setDeleteAlert(true)} block color="danger">Delete</CButton>
              </CCol>
            </CCol>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {
                  productDetails.map(([key, value], index) => {
                    if (key === "product_expiry" || key === "register_date") {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{moment(value).format("LL")}</strong></td>
                        </tr>
                      )
                    } else if (key !== "images") {
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
      {product?.product_image && <CCol lg={3} sm="12">
        <img src={`${SERVER_API}${product?.product_image}`} width="100%" height="100%" alt={`${productDetails.product_name}`} style={{ objectFit: "contain", maxHeight: "400px" }} />
      </CCol>}
      <CCol lg={12}>
        {product?.images &&
          <ImageSlider selections={false} removeProductImage={removeProductImage} images={product.images} />
        }
      </CCol>
    </CRow>
  )
}

export default Product
