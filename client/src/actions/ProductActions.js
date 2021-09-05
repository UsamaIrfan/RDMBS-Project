import axios from "axios";
import { GET_PRODUCTS, SERVER_API } from "./actionTypes";

export const addProduct = (name, catagory, subCatId, expiry, price, buyPrice, barcode, discount, profitPercent, register_date, UploadedImage, success, fail, setErrorMessage, setProductId, setProductBarcode) => {

    const postData = {
        productName: name,
        barcode: barcode,
        expiry: expiry,
        productImagePath: UploadedImage.pathOnly,
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
                    setProductBarcode(data?.barcode)
                    setProductId(data?.id)
                } else {
                    fail(true)
                    setErrorMessage(data?.msg)
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const updateProductBarCode = (barCode, id, successAlert, failAlert) => {

    const postData = {
        barcode: barCode,
        productId: id,
    }

    return (dispatch) => {
        axios.post(`${SERVER_API}/api/addProductBarcode`, postData,
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


export const addSale = ({ user, date, totalAmount, totalDiscount, amountGiven, amountReturned, paytype, status, products, successAlert, failAlert }) => {

    const postData = {
        user: user,
        date: date,
        totalAmount: totalAmount,
        totalDiscount: totalDiscount,
        amountGiven: amountGiven,
        amountReturned: amountReturned,
        paytype: paytype,
        status: status,
        products: products,
    }

    return (dispatch) => {
        axios.post(`${SERVER_API}/api/insertsale`, postData,
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




// export const addProductBarcode = (payload) => {

//     const data = {
//         barcode: payload.barcode,
//         productId: payload.productId,
//     } 

//     return (dispatch) => {
//         axios.put(`${SERVER_API}/api/updateBarcode`, data,
//             {
//                 headers: { "Content-Type": "application/json" },
//             }
//         )
//             .then(({ data }) => {
//                 if (data.success === true) {
//                     payload.successAlert(true)
//                 } else {
//                     payload.failAlert(true)
//                 }
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

// }


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

export const searchProducts = (minYear, maxYear, catId, orderBy, searchKeywords) => {
    return (dispatch) => {
        axios.get(`${SERVER_API}/api/searchProducts?minYear=${minYear}&maxYear=${maxYear}${catId ? `&catagory=${catId}` : ""}${orderBy ? `&orderBy=${orderBy}` : ""}${searchKeywords ? `&search=${searchKeywords}` : ""}`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(({ data }) => {
                if (data.success === true) {
                    dispatch({
                        type: GET_PRODUCTS,
                        products: data.data,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const uploadProductImage = (image, setUploaded, setuploadProgress, setImageLoading) => {
    var formData = new FormData();
    formData.append('file', image);
    setImageLoading(true)
    return (dispatch) => {
        axios.post(`${SERVER_API}/api/addProductImage`, formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progress) => {
                    setuploadProgress((progress.loaded * 100) / progress.total)
                    if (progress.loaded === progress.total) {
                        setuploadProgress(0)
                    }
                }
            },
        )
            .then(({ data }) => {
                setUploaded({
                    fileName: data.fileName,
                    filePath: `${SERVER_API}${data.filePath}`,
                    pathOnly: `${data.filePath}`,
                })
            })
            .catch((err) => {
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