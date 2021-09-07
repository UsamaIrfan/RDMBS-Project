import express from "express"
import bodyParser from "body-parser"
import mysql from "mysql"
import cors from "cors"
import url from 'url'
import fileUpload from "express-fileupload"
import path from "path";
import { fileURLToPath } from 'url';
import { db, connection } from "./config/index.js"
import { DELETE, GET, PUT } from "./routes.js"
import { getMonthlySales, getSales, getSalesDetails, insertSale } from "./actions/Sales.js"
import { addProduct, addProductBarcode, delProduct, getDashboardData, getProduct, getProductByBarcode, getProductCount, getProducts, getProductsByTimeline, getProductsMultiple, getProductTimeLine, getStockUpdateMonthly, productByCatagory, searchProducts } from "./actions/Products.js"
import { addCatagory, delCatagory, getCatagory, getCats, getSubCatagories } from "./actions/Catagories.js"
import { verifyUser } from "./actions/User.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.send("Working")

})

app.post("/api/addproduct", (req, res) => {

    const productName = req.body.productName
    const productBarcode = req.body.barcode
    const productExpiry = req.body.expiry
    const productCatagory = req.body.catagoryId
    const productPrice = req.body.productPrice
    const subCatId = req.body.subCatId
    const productBuyPrice = req.body.buyPrice
    const discount = req.body.discount
    const profitPercent = req.body.profitPercent
    const register_date = req.body.register_date
    const productImagePath = req.body.productImagePath
    const imagesList = req.body.images

    addProduct(productName,
        productExpiry,
        productCatagory,
        productPrice,
        subCatId,
        productBuyPrice,
        discount,
        profitPercent,
        register_date,
        productImagePath,
        imagesList,
        res
    )

})

app.get(GET.DASHBOARD_DATA, (req, res) => {

    getDashboardData(res)

})

app.get(GET.SALES_BY_MONTH, (req, res) => {

    const year = req.query.year

    getMonthlySales(year, res)

})

app.get(GET.PRODUCT_ADDED_PER_MONTH, (req, res) => {

    const year = req.query.year

    getStockUpdateMonthly(year, res)

})

app.get(GET.GET_PRODUCTS, (req, res) => {

    const lowLimit = req.query.skip
    const highLimit = req.query.numPerPage

    getProducts(lowLimit, highLimit, res)

})

app.get(GET.PRODUCT_COUNT, (req, res) => {

    getProductCount(res)

})


app.get(GET.CAT_PRODUCTS, (req, res) => {

    const id = req.query.id

    productByCatagory(id, res)

})

app.get(GET.GET_PRODUCT, (req, res) => {

    const product_id = req.query.id

    getProduct(product_id, res)

})

app.post(GET.GET_PRODUCT_BY_ID_MULTIPLE, (req, res) => {

    const product_ids = req.body.ids

    getProductsMultiple(product_ids, res)

})

app.get(GET.GET_SALE_PRODUCTS_BY_ID, (req, res) => {

    const saleId = req.query.id

    getSalesDetails(saleId, res)

})

app.get(GET.GET_PRODUCT_BY_BARCODE, (req, res) => {

    const barcode = req.query.barcode

    getProductByBarcode(barcode, res)
})


app.delete(DELETE.DEL_PRODUCT, (req, res) => {

    const product_id = req.query.id

    delProduct(product_id, res)

})

app.post("/api/addcatagory", (req, res) => {

    const catName = req.body.catName
    const catActive = req.body.catActive
    const regDate = req.body.regDate
    const subCats = req.body.subCats

    addCatagory(catName, catActive, regDate, subCats, res)

})

app.get(GET.GET_CATAGORIES, (req, res) => {

    getCats(res)

})

app.get(GET.GET_CATAGORY, (req, res) => {
    const id = req.query.id

    getCatagory(id, res)

})


app.delete(DELETE.DEL_CATAGORY, (req, res) => {

    const catId = req.query.id

    delCatagory(catId, res)

})


app.get(GET.GET_SUBCATAGORIES, (req, res) => {

    const cat_id = req.query.id

    getSubCatagories(cat_id, res)

})

app.get(GET.GET_PRODUCT_TIMELINE, (req, res) => {

    getProductTimeLine(res)

})

app.get("/api/getProductsByTimeline", (req, res) => {

    const min = req.query.minYear
    const max = req.query.maxYear

    getProductsByTimeline(min, max, res)

})

app.get(GET.SEARCH_PRODUCTS, (req, res) => {

    const search = req.query.search
    const min = req.query.minYear
    const max = req.query.maxYear
    const cat = req.query.catagory
    const orderBy = req.query.orderBy
    const desc = req.query.desc
    const limit = req.query.limit

    searchProducts(
        search,
        min,
        max,
        cat,
        orderBy,
        desc,
        limit,
        res
    )

})

app.get(GET.GET_SALES, (req, res) => {

    const min = req.query.minYear
    const max = req.query.maxYear
    const orderBy = req.query.orderBy
    const desc = req.query.desc


    const GetSales =
        `SELECT * FROM inventorysystem.sales 
        WHERE YEAR(Sale_date) between ${min} and ${max}
        ORDER BY ${orderBy ? orderBy : "Sale_Id"} ${desc ? "DESC" : "ASC"};`


    db.query(GetSales, (err, sales) => {
        if (!err && sales) {
            res.send({
                success: true,
                data: sales,
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get Sales.",
                error: err,
            })
        }
    })

})

app.get(GET.GET_SALE, (req, res) => {

    const id = req.query.id

    getSales(id, res)

})

app.put(PUT.UPDATE_BARCODE, (req, res) => {

    const id = req.query.id

    addProductBarcode(req, res)

})


app.get(GET.GET_SALES_TIMELINE, (req, res) => {

    const sqlGetTimeline =
        `SELECT YEAR(MAX(Sale_date)) as maxYear,YEAR(MIN(Sale_date)) as minYear  FROM sales;`


    db.query(sqlGetTimeline, (err, Timeline) => {
        if (!err && Timeline) {
            res.send({
                success: true,
                data: Timeline[0],
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get Years Timeline.",
                error: err,
            })
        }
    })

})

app.post("/api/insertsale", (req, res) => {

    const user = req.body.user
    const date = req.body.date
    const totalAmount = req.body.totalAmount
    const totalDiscount = req.body.totalDiscount
    const amountGiven = req.body.amountGiven
    const amountReturned = req.body.amountReturned
    const paytype = req.body.paytype
    const status = req.body.status
    const products = req.body.products

    insertSale(
        user,
        date,
        totalAmount,
        totalDiscount,
        amountGiven,
        amountReturned,
        paytype,
        status,
        products,
        res,
    )

})

app.post('/api/addProfile', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded." })
    }

    const file = req.files.file;

    file.mv(`public/userProfiles/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/profiles/${file.name}` })
    })

});

app.post('/api/addProductImage', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded." })
    }

    const file = req.files.file;

    file.mv(`public/images/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        res.json({ fileName: file.name, filePath: `/images/${file.name}` })
    })

});

app.get('/images/:imageName', (req, res) => {

    const { imageName } = req.params;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    res.sendFile(path.join(__dirname + `/public/images/${imageName}`))

})

app.get('/profiles/:imageName', (req, res) => {

    const { imageName } = req.params;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    res.sendFile(path.join(__dirname + "/public/userProfiles/Schema1.png"))

})


app.post('/api/login', (req, res) => {

    const { userName } = req.body

    verifyUser(userName, res)

})


app.listen(3001, () => {
    console.log("Running on Port 3001")
})