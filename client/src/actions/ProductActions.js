import axios from "axios";
import { GET_PRODUCTS, SERVER_API } from "./actionTypes";

export const addProduct = (name, catagory, subCatId, expiry, price, buyPrice, barcode, discount, profitPercent, register_date, success, fail) => {

    const postData = {
        productName: name,
        barcode: barcode,
        expiry: expiry,
        subCatId: subCatId,
        catagoryId: catagory,
        productPrice: price,
        buyPrice: buyPrice,
        discount: discount,
        profitPercent: profitPercent,
        register_date: register_date
    }

    return (dispatch) => {
        axios.post(`${SERVER_API}/api/addproduct`, postData,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    success(true)
                    console.log(data)
                } else {
                    fail(true)
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


export const addCatagory = (name, isActive, regDate, subCats, successAlert, failAlert) => {

    const postData = {
        catName: name,
        catActive: isActive,
        regDate: regDate,
        subCats: subCats,
    }

    return (dispatch) => {
        axios.post(`${SERVER_API}/api/addcatagory`, postData,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    successAlert(true)
                    console.log(data)
                } else {
                    failAlert(true)
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getAllProducts = () => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/getproducts`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    dispatch({
                        type: GET_PRODUCTS,
                        products: response.data.List
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getProductsById = (id) => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/getcatproducts?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    return response.data.List
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getProductsByTimeline = () => {

    axios.get(`${SERVER_API}/api/getProductsTimeline`,
        {
            headers: { "Content-Type": "application/json" },
        }
    )
        .then((response) => {
            if (response.data.success === true) {
                return response.data.data
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getProductById = (id) => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/getproduct?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    return response.data.product
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const delProduct = (id, successAlert, FailAlert) => {

    return (dispatch) => {
        console.log(`${SERVER_API}/api/delproduct?id=${id}`)
        axios.delete(`${SERVER_API}/api/delproduct?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    successAlert(true)
                } else {
                    FailAlert(true)
                }
            })
            .catch((err) => {
                FailAlert()
                console.log(err)
            })
    }
}

export const delCatagory = (id, successAlert, FailAlert) => {

    return (dispatch) => {
        axios.delete(`${SERVER_API}/api/delcatagory?id=${id}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    successAlert(true)
                } else {
                    FailAlert(true)
                }
            })
            .catch((err) => {
                FailAlert()
                console.log(err)
            })
    }
}