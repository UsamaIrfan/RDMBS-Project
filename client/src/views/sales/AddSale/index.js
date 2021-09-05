import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CListGroup,
    CListGroupItem,
    CInputFile,
    CInputCheckbox,
    CLabel,
    CSelect,
    CRow,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { addProduct, addSale, searchProducts } from '../../../actions/ProductActions'
import { useSelector } from 'react-redux';
import moment from "moment";
import SweetAlert from 'react-bootstrap-sweetalert';
import { getAllCatagories } from 'src/actions/CatagoryActions'
import { GET_PRODUCTS, SERVER_API } from 'src/actions/actionTypes'
import axios from "axios"
import { motion } from "framer-motion";
import { LinearProgress } from '@material-ui/core'
import AwesomeDebouncePromise from "awesome-debounce-promise";
import BarcodeReader from 'react-barcode-reader'
import AsyncSelect from 'react-select/async';
import Scanner from 'src/reusable/BarCodeScanner'
import Result from 'src/reusable/Result'

function AddProduct() {
    const [ProductName, setProductName] = React.useState("")
    const [ProductId, setProductId] = React.useState("")
    const [AmountGiven, setAmountGiven] = React.useState("")
    const [ProductDescription, setProductDescription] = React.useState("")
    const [ExpiryDate, setExpiryDate] = React.useState("")
    const [productCatagory, setproductCatagory] = React.useState("")
    const [SubCat, setSubCat] = React.useState("")
    const [BuyPrice, setBuyPrice] = React.useState("")
    const [InStock, setInStock] = React.useState(false)
    const [ShowError, setShowError] = React.useState(false)
    const [ShowSuccess, setShowSuccess] = React.useState(false)
    const [ShowFail, setShowFail] = React.useState(false)
    const [large, setLarge] = React.useState(false)
    const [Total, setTotal] = React.useState(0)
    const [ScannedData, setScannedData] = React.useState([])
    const [IsScanning, setIsScanning] = React.useState()
    const [SelectedProducts, setSelectedProducts] = React.useState([])
    const [ShowProductList, setShowProductList] = React.useState(false)
    const [ListLoading, setListLoading] = React.useState(true)
    const [ScanResults, setScanResults] = React.useState({})
    const [ListItems, setListItems] = React.useState([])

    const handleDateChange = (date) => {
        const dateObj = new Date(date)
        var momentObj = moment(dateObj);
        setExpiryDate(momentObj.format("YYYY-MM-DD"));
    };

    const dispatch = useDispatch()

    useEffect(() => {
        getCatagories()
    }, [])

    const getCatagories = async () => {
        await dispatch(getAllCatagories())
    }

    const userEmail = useSelector(state => state.user?.email)
    const catagories = useSelector(state => state.catagories)

    const submitHandler = () => {
        const dateObj = new Date()
        const momentObj = moment(dateObj)
        const register_date = momentObj.format("YYYY-MM-DD")
    }

    const resetFunc = () => {
        setProductName("")
        setAmountGiven("")
        setProductDescription("")
        setExpiryDate("")
        setproductCatagory("")
    }


    const handleNameChange = (text) => {
        if (!text) {
            setShowProductList(false)
            return;
        }

        const searchFunc = axios.get(`${SERVER_API}/api/searchProducts?search=${text}&limit=10`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    setListItems(data.data)
                    setListLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        AwesomeDebouncePromise(searchFunc, 5000)
        setShowProductList(true)

    }

    const handleRowClick = (item) => {
        setShowProductList(false)
        setProductId(item.product_id)
        axios.get(`${SERVER_API}/api/getproduct?id=${item.product_id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    setAmountGiven(data.product?.pp_sellingPrice)
                    setBuyPrice(data.product?.pp_buyingPrice)
                    setproductCatagory(data.product?.catagory)
                    setExpiryDate(moment(data.product?.product_expiry).format("YYYY-MM-DD"))
                    setSubCat(data.product?.subCat)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setProductName(item.product_name)
    }

    const handleScan = (data) => {
        setScanResults(data)
    }
    const handleError = (err) => {
        console.error(err)
    }

    const loadOptions = (inputValue, callback) => {
        axios.get(`${SERVER_API}/api/searchProducts?search=${inputValue}&limit=10`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    setListItems(data.data)
                    setListLoading(false)
                    callback(data.data.map(i => ({ label: i.product_name, value: i.product_id, ...i })))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handleProductChange = (val) => {
        let total = 0
        setSelectedProducts(val)
        console.log(val)
        if (val.length) {
            val.forEach(i => total += i?.pp_sellingPrice)
        }
        setTotal(total)
    }

    const onDetected = result => {
        // this.setState({ results: this.state.results.concat([result]) })
        setScannedData(result.codeResult.code)
    }

    const onSubmitHandler = async () => {
        await dispatch(addSale({
            user: userEmail,
            amountGiven: AmountGiven,
            totalAmount: Total,
            amountReturned: Total < AmountGiven ? Math.abs(Total - AmountGiven) : 0,
            date: moment(new Date()).format("YYYY/MM/DD"),
            failAlert: setShowFail,
            successAlert: setShowSuccess,
            paytype: "cash",
            products: ListItems,
            status: "completed",
            totalDiscount: 0,
        }))
    }

    return (
        <>
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <button onClick={() => setIsScanning(!IsScanning)}>
                            {IsScanning ? 'Stop' : 'Start'}
                        </button>
                        <ul className="results">
                            <p>{ScannedData ? ScannedData : ""}</p>
                        </ul>
                        {IsScanning ? <Scanner onDetected={onDetected} /> : null}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setLarge(!large)}>Do Something</CButton>{' '}
                    <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            <CRow>
                <SweetAlert
                    success
                    title={"Success"}
                    show={ShowSuccess}
                    onConfirm={() => setShowSuccess(false)}
                >
                    Product Added
                </SweetAlert>
                <SweetAlert
                    danger
                    title={"Failed"}
                    show={ShowFail}
                    onConfirm={() => setShowFail(false)}
                >
                    Unable to Add Product
                </SweetAlert>
                <SweetAlert
                    warning
                    title={"Network Error"}
                    show={ShowError}
                    onConfirm={() => setShowError(false)}
                >
                    Request Failed
                </SweetAlert>
                <CCol xs="12" md="12">
                    <CCard>
                        <CCardHeader>
                            Add Product
                            <small> Inventory</small>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CCol row md="12" lg="12" sm="12" className="text-right mb-3">
                                    <h2>Total: <span className="text-success">Rs {Total}</span></h2>
                                </CCol>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel>Email</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <p className="form-control-static">{userEmail && userEmail}</p>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Product Id</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CCol className="d-flex flex-wrap justify-content-between m-0 p-0">
                                            <CInput className="col-9" type="number" value={ProductId} onChange={(e) => setProductId(e.target.value)} id="text-input" name="text-input" placeholder="Number" />
                                            <CCol md="3" sm="12" lg="2">
                                                <CButton onClick={() => setLarge(!large)} className="btn btn-info col-12 m-0">Scan Barcode</CButton>
                                            </CCol>
                                        </CCol>
                                        <CFormText>Product Barcode</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Product Name</CLabel>
                                    </CCol>
                                    <CCol style={{ position: "relative" }} xs="12" md="9">
                                        <AsyncSelect
                                            isMulti
                                            closeMenuOnSelect={false}
                                            options={ListItems}
                                            cacheOptions
                                            defaultOptions
                                            onChange={val => { handleProductChange(val) }}
                                            loadOptions={loadOptions}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Amount Given</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput value={AmountGiven} onChange={e => setAmountGiven(e.target.value)} id="text-input" type="number" name="text-input" placeholder="Amount in numbers" />
                                        <CFormText>Enter amount less than 100000</CFormText>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="3">
                                        <CLabel htmlFor="text-input">Amount To Return</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                        <CInput value={AmountGiven > Total ? Math.abs(Total - AmountGiven) : 0} disabled id="text-input" type="number" name="text-input" placeholder="Amount in numbers" />
                                    </CCol>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter>
                            <CButton className="mr-2" type="submit" size="sm" color="primary" onClick={onSubmitHandler}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="reset" size="sm" color="danger" onClick={() => resetFunc()}><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default AddProduct
