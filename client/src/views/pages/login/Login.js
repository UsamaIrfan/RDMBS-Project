import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CSpinner ,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useDispatch} from "react-redux"
import {motion} from "framer-motion";

// Sign in Actions
import * as AuthActions from "../../../actions/storeActions";

const Login = () => {

  const [Email, setEmail] = React.useState("")
  const [Loading, setLoading] = React.useState(false)
  const [Password, setPassword] = React.useState("")
  const [Error, setError] = React.useState({
    Email: false,
    Password: false,
    toMany: false,
  })
  
  const dispatch = useDispatch()
  const history = useHistory()



  const loginHandler = async () => {
    setLoading(true)
    await dispatch(AuthActions.login(Email, Password, setError, history))
    setLoading(false)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput invalid={Error.Email} onChange={e => setEmail(e.target.value)} value={Email} type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onSubmit={loginHandler} invalid={Error.Password} onChange={e => setPassword(e.target.value)} value={Password} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="5">
                      <CButton type="submit" color="primary" onClick={loginHandler}  className="px-4"><motion.div initial={{width: "80px"}} animate={Loading ? {width: "100px"} : {width: "80px"}}>{Loading && <CSpinner size="sm" className={"mr-2"} />}Login</motion.div></CButton>
                      </CCol>
                      {Error.toMany && <CCol xs="7" className="text-right">
                        <p color="danger" className="px-0 text-danger">To many Attempts, try again later.</p>
                      </CCol>}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome to Inventory Dashboard</h2>
                    <p>Please provide your account credentials.</p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3"active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
