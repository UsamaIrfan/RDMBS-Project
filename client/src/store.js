import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { SET_USER, GET_PRODUCTS, GET_CATAGORIES, GET_SALES, GET_DASHBOARD_SALES_DATA, GET_DASHBOARD_INITIALS, GET_PRODUCTS_ADDED_MONTHLY } from "./actions/actionTypes";

const initialState = {
  sidebarShow: 'responsive',
  user: null,
  products: [],
  catagories: [],
  sales: [],
  dashboardSales: [],
  dashboardInitials: {
    products: 2,
    catagories: 0,
    sales: 0,
    revenue: 0
  },
  productPerMonth: []
}

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, sidebarShow: action.sidebarShow }

    case SET_USER:
      return { ...state, user: action.user }
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case GET_CATAGORIES:
      return { ...state, catagories: action.catagories }
    case GET_SALES:
      return { ...state, sales: action.sales }
    case GET_DASHBOARD_SALES_DATA:
      return { ...state, saldashboardSaleses: action.data }
    case GET_DASHBOARD_INITIALS:
      return { ...state, dashboardInitials: action.data }
    case GET_PRODUCTS_ADDED_MONTHLY:
      return { ...state, productPerMonth: action.data }
    default:
      return state
  }
}

const store = createStore(changeState, applyMiddleware(thunk))
export default store