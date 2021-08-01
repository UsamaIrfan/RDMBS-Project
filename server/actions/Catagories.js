import { db } from "../config/index.js"

export const addCatagory = (
    catName,
    catActive,
    regDate,
    subCats,
    res
) => {
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
}

export const getCats = (res) => {
    const sqlGetCategories =
        `SELECT * FROM categories;`

    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.categories;`

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
}

export const getCatagory = (id, res) => {
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
}

export const delCatagory = (catId, res) => {
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
}

export const getSubCatagories = (catId, res) => {
    const sqlGetSubCategories = (id) =>
        `SELECT * FROM sub_catagories WHERE catagory_id = ${id};`

    const sqlGetProductsCount = `SELECT COUNT(*) FROM inventorysystem.sub_catagories WHERE catagory_id = ${catId};`

    db.query(sqlGetSubCategories(catId), (err, catagories) => {
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
}