import React from 'react'
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
    CInputFile,
    CLabel,
    CRow,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { addCatagory } from 'src/actions/ProductActions'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from "moment";
import { WithContext as ReactTags } from 'react-tag-input';
import "./styles.css"

function AddCatagory() {
    const [CatagoryName, setCatagoryName] = React.useState("")
    const [CatDesc, setCatDesc] = React.useState("")
    const [InStock, setInStock] = React.useState(false)
    const [ShowSuccess, setShowSuccess] = React.useState(false)
    const [ShowFail, setShowFail] = React.useState(false)
    const [tags, settags] = React.useState([])
    const [Error, setError] = React.useState({
        Name: false,
        Description: false,
    })

    const resetFunc = () => {
        setCatagoryName("")
        setCatDesc("")
    }

    const dispatch = useDispatch()

    const submitHandler = async () => {
        const date = new Date()
        const momentObj = moment(date)
        const regDate = momentObj.format("YYYY-MM-DD")
        if (CatagoryName === "") {
            setError(prev => ({ ...prev, Name: true }))
            return;
        }
        await dispatch(addCatagory(CatagoryName, "active", regDate, tags, setShowSuccess, setShowFail))
    }

    const handleDelete = (index) => {
        const tags = [...tags];
        // console.log(index,[...tags.filter((tag, i) => i !== index)]);
        settags(prev => prev.filter((itm, idx) => idx !== index))
    }

    const handleAddition = (tag) => {
        if (tags.length < 10) {
            settags(prev => [...prev, tag]);
        }
    }

    const handleDrag = (tag, currPos, newPos) => {
        const tags = [...tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        settags(tags)
    }

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }
    console.log(tags)

    const userEmail = useSelector(state => state.user?.email)
    return (
        <CRow>
            <CCol xs="12" md="12">
                <SweetAlert
                    success
                    title={"Success"}
                    show={ShowSuccess}
                    onConfirm={() => setShowSuccess(false)}
                >
                    Catagory Added
                </SweetAlert>
                <SweetAlert
                    danger
                    title={"Failed"}
                    show={ShowFail}
                    onConfirm={() => setShowFail(false)}
                >
                    Unable to Add Catagory
                </SweetAlert>
                <CCard>
                    <CCardHeader>
                        Add Catagory
                        <small> Inventory</small>
                    </CCardHeader>
                    <CCardBody>
                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
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
                                    <CLabel htmlFor="text-input">Catagory Name</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput invalid={Error.Name} value={CatagoryName} onChange={e => setCatagoryName(e.target.value)} id="text-input" name="text-input" placeholder="Text" />
                                    <CFormText>Catagory Display Name</CFormText>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol md="3">
                                    <CLabel value={CatDesc} onChange={e => setCatDesc(e.target.value)} htmlFor="textarea-input">Catagory Description</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CTextarea
                                        invalid={Error.Description}
                                        name="textarea-input"
                                        id="textarea-input"
                                        rows="9"
                                        placeholder="Content..."
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol tag="label" sm="3" className="col-form-label">
                                    In Stock
                                </CCol>
                                <CCol sm="9">
                                    <CSwitch
                                        className="mr-1"
                                        color="primary"
                                        defaultChecked
                                        shape="pill"
                                        onClick={() => setInStock(!InStock)}
                                        checked={InStock}
                                    />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol tag="label" sm="3" className="col-form-label">
                                    Sub Catagories
                                </CCol>
                                <CCol sm="9">
                                    <ReactTags
                                        tags={tags}
                                        handleDelete={(i) => handleDelete(i)}
                                        handleAddition={handleAddition}
                                        // handleDrag={handleDrag}
                                        handleTagClick={handleTagClick}
                                        inputFieldPosition="bottom"
                                        autocomplete
                                    />
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CLabel col md={3}>Catagory Image (Optional)</CLabel>
                                <CCol xs="12" md="9">
                                    <CInputFile custom id="custom-file-input" />
                                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                                        Choose file...
                                    </CLabel>
                                </CCol>
                            </CFormGroup>
                        </CForm>
                    </CCardBody>
                    <CCardFooter>
                        <CButton disabled={CatagoryName.length < 4} type="submit" size="sm" color="primary" onClick={submitHandler}><CIcon name="cil-scrubber" /> Submit</CButton>
                        <CButton type="reset" size="sm" color="danger" onClick={resetFunc}><CIcon name="cil-ban" /> Reset</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddCatagory
