import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { SET_USER, GET_PRODUCTS, GET_CATAGORIES, GET_SALES } from "./actions/actionTypes";

const initialState = {
  sidebarShow: 'responsive',
  user: null,
  products: [],
  catagories: [],
  sales: [],
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
    default:
      return state
  }
}

const store = createStore(changeState, applyMiddleware(thunk))
export default store