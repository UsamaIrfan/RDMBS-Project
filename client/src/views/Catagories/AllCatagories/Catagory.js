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
  const catagoryData = useSelector(state => state.catagories)
  const [catagory, setcatagory] = React.useState(catagoryData.find(cat => cat.categories_id.toString() === match.params.id))
  const catagoryDetails = catagory ? Object.entries(catagory) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    getProduct()
  }, [])

  const dispatch = useDispatch()

  const deleteCatagory = async (id) => {
    await dispatch(delCatagory(id, setShowSuccess, setShowFail, history))
  }

  const getProduct = () => {
    axios.get(`${SERVER_API}/api/getcatagory?id=${match.params.id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.data.success === true) {
          setcatagory(response.data.catagory)
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
        onConfirm={() => { setDeleteAlert(false); deleteCatagory(catagory.categories_id) }}
        onCancel={() => setDeleteAlert(false)}
        focusCancelBtn
      >
        This will delete All the products related as well. This is not recoverable.
      </SweetAlert>
      <SweetAlert
        success
        title={"Success"}
        show={ShowSuccess}
        onConfirm={() => {
          setShowSuccess(false)
          history.push("/catagories/allcatagories")
        }}
      >
        Catagory Deleted
      </SweetAlert>
      <SweetAlert
        danger
        title={"Failed"}
        show={ShowFail}
        onConfirm={() => setShowFail(false)}
      >
        Unable to Delete Catagory
      </SweetAlert>
      <CCol lg={9}>
        <CCard>
          <CCardHeader style={{ justifyContent: "space-between", display: "flex" }}>
            Catagory id: {match.params.id}
            <CRow className="align-items-center">
              <CCol col="6" sm="4" md="2" xl className="mb-1 mb-xl-0">
                <CButton block color="primary" className="d-xl-flex" onClick={() => history.push(`/catagories/${match.params.id}/products`)}>Products</CButton>
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
                  catagoryDetails.map(([key, value], index) => {
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
