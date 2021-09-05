import { db } from "../config/index.js";

function getRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const addProduct = (productName,
    productBarcode,
    productExpiry,
    productCatagory,
    productPrice,
    subCatId,
    productBuyPrice,
    discount,
    profitPercent,
    register_date,
    productImagePath,
    res
) => {

    if (productPrice < 1 || productBuyPrice < 1) {
        res.send(`Please Add a valid product price`)
        return;
    }

    const barcode = getRandomString(8)

    const sqlInsertProduct = (id) =>
        `INSERT INTO products 
    (product_id, product_name, ${barcode ? `product_barcode,` : ""} product_expiry, parent_id, register_date, subcat_id, product_image) VALUES 
    (${id}, '${productName}', ${barcode ? `'${barcode}',` : ""} '${productExpiry}', ${productCatagory}, '${register_date}', ${subCatId}, '${productImagePath}');`

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
                            message: "Added Successfully",
                            barcode,
                            id,
                        })
                    })
                } else if (err?.errno === 1062) {
                    res.send({
                        msg: "Product Already Exists",
                        error: err,
                    })
                } else {
                    res.send(err ? err : resolve)
                }


            })

        } else {
            res.send(err ? err : resolve)
        }
    })
}

export const addProductBarcode = (req, res) => {

    const { barcode, productId } = req

    const sqlInsertProductBarcode =
        `UPDATE inventorysystem.products SET product_barcode="${barcode}" WHERE product_id=${productId};`

    db.query(sqlInsertProductBarcode, (err, resolve) => {
        if (!err && resolve) {
            res.send({
                success: true,
                message: "Updated Successfully",
            })
        } else {
            res.status(400).json({ msg: "Bad Request", err: err })
        }
    })

}


export const getProducts = (lowLimit, highLimit, res) => {
    const sqlGetProducts =
        `SELECT * FROM products ${lowLimit && highLimit ? `LIMIT ${lowLimit}, ${highLimit}` : ""};`


    db.query(sqlGetProducts, (err, products) => {
        if (!err && products) {
            res.send({
                success: true,
                List: products,
            })
        } else {
            res.send(err)
        }
    })
}


export const getProductCount = (res) => {
    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.products;`

    db.query(sqlGetProductsCount, (err, productCount) => {
        let count = productCount ? productCount[0]["COUNT(*)"] : 0
        if (!err && productCount) {
            res.send({
                success: true,
                count: count,
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get Product Count.",
                error: err,
            })
        }
    })
}

export const productByCatagory = (id, res) => {
    const sqlGetProducts =
        `SELECT * FROM products WHERE parent_id = ${id};`

    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.products;`

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
}

export const getProduct = (product_id, res) => {

    const sqlGetProduct = `
    SELECT * FROM inventorysystem.products
    INNER JOIN inventorysystem.product_price
    ON products.product_id = product_price.pp_productId
    WHERE products.product_id = ${product_id};
    `

    const sqlGetCatagory = (id) => `SELECT * FROM categories WHERE categories_id = ${id} LIMIT 1;`
    const sqlGetSubCatagory = (id) => `SELECT * FROM sub_catagories WHERE subcat_id = ${id} LIMIT 1;`


    db.query(sqlGetProduct, (err, product) => {
        if (!err && product) {

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
                message: "Unable to Get Product",
                error: err,
            })
        }
    })
}

export const delProduct = (product_id, res) => {
    const sqlDeleteProduct = `DELETE FROM products WHERE product_id = ${product_id} LIMIT 1;`

    db.query(sqlDeleteProduct, (err, product) => {
        if (!err && product?.affectedRows > 0) {
            res.send({
                success: true,
                message: "Product Deleted",
            })
        } else {
            res.send({
                success: false,
                message: err ? err : product,
            })
        }
    })
}

export const getProductTimeLine = (res) => {
    const sqlGetTimeline =
        `SELECT YEAR(MAX(register_date)) as maxYear,YEAR(MIN(register_date)) as minYear  FROM products;`


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
}

export const getProductsByTimeline = (min, max, res) => {
    const sqlGetTimelineProducts =
        `SELECT * FROM inventorysystem.products WHERE YEAR(register_date) between ${min} and ${max};`


    db.query(sqlGetTimelineProducts, (err, products) => {
        if (!err && products) {
            res.send({
                success: true,
                data: products,
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get Years Timeline Products.",
                error: err,
            })
        }
    })
}

export const searchProducts = (
    search,
    min,
    max,
    cat,
    orderBy,
    desc,
    limit,
    res
) => {

    const sqlGetTimelineProducts =
        `SELECT * FROM inventorysystem.products
        INNER JOIN inventorysystem.product_price
        ON products.product_id = product_price.pp_productId
        WHERE YEAR(register_date)${min && max ? ` between ${min} and ${max}` : ""}
        ${cat ? `AND parent_id = ${cat}` : ""}
        ${search && search?.length > 0 && search !== "" ? `AND product_name LIKE '%${search}%'` : ""}
        ORDER BY ${orderBy ? orderBy : "product_id"} ${desc ? "DESC" : "ASC"}
        ${limit ? ` LIMIT ${limit}` : ""}
        ;`


    db.query(sqlGetTimelineProducts, (err, products) => {
        if (!err && products) {
            res.send({
                success: true,
                data: products,
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get Search Products.",
                error: err,
            })
        }
    })
}