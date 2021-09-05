import { db, connection } from "../config/index.js";


export const getSales = (id, res) => {
    const GetSale =
        `SELECT * FROM inventorysystem.sales
    WHERE sales.Sale_Id = ${id};`


    db.query(GetSale, (err, sale) => {
        if (!err && sale) {
            res.send({
                success: true,
                data: sale,
            })
        } else {
            res.send({
                success: false,
                message: "Unable to get sales by Id.",
                error: err,
            })
        }
    })
}

export const insertSale = (
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
) => {
    const sqlInsertSale = `INSERT INTO sales (
        Sale_doneby,
        Sale_date,
        Sale_totalAmount,
        Sale_totalDiscount,
        Sale_amountGiven,
        Sale_amountReturn,
        Sale_paytype,
        Sale_status)
    VALUES(
        '${user}',
        '${date}',
        ${totalAmount},
        ${totalDiscount},
        ${amountGiven},
        ${amountReturned},
        '${paytype}',
        '${status}'
    );`

    const insertSaleDetails = (id) => {

        let productsSqlQuery = ""
        if (products.length > 0) {
            products?.forEach((item) => {
                productsSqlQuery += `(${id}, ${item.product_id}, ${item.quantity}, ${item.pp_sellingPrice}, ${item.pp_discount}),`
            })
        }

        return `INSERT INTO saledetails (
            sd_saleId,
            sd_productId,
            sd_quantity,
            sd_sellingPrice,
            sd_discount
            )
        VALUES ${productsSqlQuery.substring(0, productsSqlQuery.length - 1)};`
    }

    connection.beginTransaction(function (err) {
        if (err) {
            res.send({
                success: false,
                err: err,
                query: sqlInsertSale,
            })
        }
        connection.query(sqlInsertSale, function (err, result) {
            if (err) {
                connection.rollback(function () {
                    res.send({
                        success: false,
                        err: err,
                        query: sqlInsertSale,
                    })
                    return;
                });
            }

            var log = result?.insertId;

            connection.query(insertSaleDetails(log), function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        res.send({
                            success: false,
                            err: err,
                            query: sqlInsertSale,
                            query2: insertSaleDetails(log)
                        })
                        return;
                    });
                }
                connection.commit(function (err) {
                    if (err) {
                        connection.rollback(function () {
                            res.send({
                                success: false,
                                err: err,
                            })
                            return;
                        });
                    }
                    res.send({
                        success: true,
                        message: "Transaction Complete"
                    });
                    return;
                });
            });
        });
    });
}