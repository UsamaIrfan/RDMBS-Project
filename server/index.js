const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")
var url = require('url');

const app = express()

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: 'inventorysystem',
})

app.use(cors())
app.use(express.json())
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

    console.log(req.body)

    if (productPrice < 1) {
        res.send(`Please Add a valid product price`)
        return;
    }

    const sqlInsertProduct = (id) =>
        `INSERT INTO products 
    (product_id, product_name, ${productBarcode ? `product_barcode,` : ""} product_expiry, parent_id, register_date, subcat_id) VALUES 
    (${id}, '${productName}', '${productBarcode ? `${productBarcode},` : ""}' '${productExpiry}', ${productCatagory}, '${register_date}', ${subCatId});`

    const sqlGetProductCount = `SELECT COUNT(*) FROM inventorysystem.products;`

    const sqlInsertPrice = (id) =>
        `INSERT INTO product_price 
    (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
    (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`


    db.query(sqlGetProductCount, (err, resolve) => {

        if (!err && resolve) {

            let count = resolve ? resolve[0]["COUNT(*)"] : 0
            const id = parseInt(`${productCatagory}${count}`)

            db.query(sqlInsertProduct(id), (err, resolve) => {

                if (!err && resolve) {

                    db.query(sqlInsertPrice(id), (err, resolve) => {
                        res.send({
                            success: true,
                            message: "Added Successfully"
                        })
                    })
                } else {
                    res.send(err ? err : resolve)
                }


            })

        } else {
            res.send(err ? err : resolve)
        }
    })

})

app.get("/api/getproducts", (req, res) => {

    const sqlGetProducts =
        `SELECT * FROM products;`

    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.products;`

    // const sqlInsertPrice = (id) =>
    //     `INSERT INTO product_price 
    // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
    // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`

    db.query(sqlGetProducts, (err, products) => {
        if (!err && products) {
            db.query(sqlGetProductsCount, (err, productCount) => {
                let count = productCount ? productCount[0]["COUNT(*)"] : 0
                res.send({
                    success: true,
                    List: products,
                    count: count,
                })
            })
        } else {
            res.send(err)
        }
    })

})

app.get("/api/getproduct", (req, res) => {

    const product_id = req.query.id

    const sqlGetProduct = `SELECT * FROM products WHERE product_id = ${product_id} LIMIT 1;`
    const sqlGetPrice = `SELECT * FROM product_price WHERE pp_productId = ${product_id} LIMIT 1;`
    const sqlGetCatagory = (id) => `SELECT * FROM categories WHERE categories_id = ${id} LIMIT 1;`
    const sqlGetSubCatagory = (id) => `SELECT * FROM sub_catagories WHERE subcat_id = ${id} LIMIT 1;`


    db.query(sqlGetProduct, (err, product) => {
        if (!err && product) {

            db.query(sqlGetPrice, (err, price) => {
                if (!err && price) {

                    db.query(sqlGetCatagory(product[0]?.parent_id),
                        (err, cat) => {
                            if (!err && cat) {

                                if (product[0]?.subcat_id) {

                                    db.query(sqlGetSubCatagory(product[0]?.subcat_id),
                                        (err, subCat) => {
                                            if (!err && subCat) {
                                                res.send({
                                                    success: true,
                                                    product: {
                                                        ...product[0],
                                                        catagory: cat[0]?.categories_name,
                                                        ...price[0],
                                                        subCat: subCat[0]?.subcat_name,
                                                    },
                                                })
                                            } else {
                                                res.send({
                                                    success: false,
                                                    message: "Unable To Get Sub Catagory Data.",
                                                    error: err,
                                                })
                                            }
                                        }
                                    )

                                } else {
                                    res.send({
                                        success: true,
                                        product: {
                                            catagory: cat[0]?.categories_name,
                                            ...product[0],
                                            ...price[0]
                                        },
                                    })
                                }


                            } else {
                                res.send({
                                    success: false,
                                    message: "Unable To Get Catagory Data.",
                                    error: err,
                                })
                            }

                        }

                    )

                } else {
                    res.send({
                        success: false,
                        message: "Unable TO Get Pricing.",
                        error: err,
                    })
                }
            })

        } else {
            res.send({
                success: false,
                message: "Unable to Get Product",
                error: err,
            })
        }
    })

})


app.delete("/api/delproduct", (req, res) => {

    const product_id = req.query.id

    const sqlDeleteProduct = `DELETE FROM products WHERE product_id = ${product_id} LIMIT 1;`
    
    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.products;`
    
    // const sqlInsertPrice = (id) =>
    //     `INSERT INTO product_price 
    // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
    // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`
    
    db.query(sqlDeleteProduct, (err, product) => {
        if (!err && product) {
            res.send({
                success: true,
                message: "Product Deleted",
            })
        } else {
            res.send({
                success: false,
                message: err,
            })
        }
    })
    
})

app.post("/api/addcatagory", (req, res) => {
    
    const catName = req.body.catName
    const catActive = req.body.catActive
    const regDate = req.body.regDate
    const subCats = req.body.subCats
    
    const sqlInsertCatagory = (id) =>
    `INSERT INTO categories 
    (categories_id, categories_name, categories_isActive, register_date) VALUES 
    (${id}, '${catName}', '${catActive}', '${regDate}');`
    
    
    const sqlGetCatagoryCount = `SELECT COUNT(*) FROM inventorysystem.categories;`
    
    db.query(sqlGetCatagoryCount, (err, resolve) => {
        
        let count = resolve ? resolve[0]["COUNT(*)"].toString().concat(Math.floor(Math.random() * 10) + 1) : 0
        
        db.query(sqlInsertCatagory(count), (err, resolve) => {
            
            if (!err && resolve && count != 0) {
                
                let sqlQuery = `INSERT INTO sub_catagories (subcat_name, catagory_id) VALUES `
                
                subCats.forEach((item) => {
                    sqlQuery = sqlQuery.concat(`('${item.text}', ${count}),`)
                })
                
                db.query(
                    sqlQuery.substring(0, sqlQuery.length - 1),
                    (err, resolve) => {
                        if (!err && resolve) {
                            res.send({
                                success: true,
                                message: "Added Successfully.",
                            })
                        } else {
                            res.send({
                                success: false,
                                message: "Failed to Add Product.",
                                error: err,
                                query: sqlQuery
                            })
                        }
                    }
                )
                
            } else {
                if (err.code === "ER_DUP_ENTRY") {
                    res.send({
                        success: false,
                        message: "The catagory already exists.",
                    })
                }
            }
        })
    })
    
})

app.get("/api/getcatagories", (req, res) => {
    
    const sqlGetCategories =
    `SELECT * FROM categories;`
    
    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.categories;`
    
    // const sqlInsertPrice = (id) =>
    //     `INSERT INTO product_price 
    // (pp_productId, pp_buyingPrice, pp_sellingPrice, pp_discount, pp_profitPercentage) VALUES 
    // (${id}, ${productBuyPrice}, ${productPrice}, ${discount ? discount : null}, ${profitPercent ? profitPercent : null});`
    
    db.query(sqlGetCategories, (err, catagories) => {
        if (!err && catagories) {
            db.query(sqlGetProductsCount, (err, catCount) => {
                let count = catCount ? catCount[0]["COUNT(*)"] : 0
                res.send({
                    success: true,
                    List: catagories,
                    count: count,
                })
            })
        } else {
            res.send(err)
        }
    })
    
})

app.get("/api/getcatagory", (req, res) => {
    const id = req.query.id
    const sqlGetCatagory = `SELECT * FROM categories WHERE categories_id = ${id} LIMIT 1;`
    const sqlGetProductsCount = `SELECT COUNT(*) FROM products WHERE parent_id = ${id};`
    
    db.query(sqlGetCatagory, (err, cat) => {
        if (!err && cat) {

            db.query(sqlGetProductsCount, (err, productCount) => {
                let count = productCount ? productCount[0]["COUNT(*)"] : 0
                res.send({
                    success: true,
                    catagory: {
                        ...cat[0],
                        products: count,
                    }
                })
            })

        } else {
            res.send({
                success: false,
                message: "Unable to get Catagory Data.",
                error: err,
            })
        }
    })

})


app.delete("/api/delcatagory", (req, res) => {

    const catId = req.query.id

    const sqlDeleteCatagory = `DELETE FROM categories WHERE categories_id = ${catId} LIMIT 1;`

    db.query(sqlDeleteCatagory, (err, cat) => {
        if (!err && cat) {
            res.send({
                success: true,
                message: "Catagory Deleted",
            })
        } else {
            res.send({
                success: false,
                message: "Unable To delete Catagory",
                error: err,
            })
        }
    })

})


app.get("/api/getsubcats", (req, res) => {
    
    const cat_id = req.query.id
    
    const sqlGetSubCategories = (id) =>
    `SELECT * FROM sub_catagories WHERE catagory_id = ${id};`
    
    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.sub_catagories WHERE catagory_id = ${cat_id};`
    
    db.query(sqlGetSubCategories(cat_id), (err, catagories) => {
        if (!err && catagories) {
            db.query(sqlGetProductsCount, (err, subCatCount) => {
                let count = subCatCount ? subCatCount[0]["COUNT(*)"] : 0
                res.send({
                    success: true,
                    List: catagories,
                    count: count,
                })
            })
        } else {
            res.send(err)
        }
    })

})

app.listen(3001, () => {
    console.log("Running on Port 3001")
})