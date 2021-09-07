import { GET_DASHBOARD_INITIALS, GET_DASHBOARD_SALES_DATA, GET_SALES, SERVER_API } from "./actionTypes"
import axios from "axios";

export const getAllSales = () => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/getsales?minYear=2016&maxYear=2021&desc=true&orderBy=Sale_Id`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    dispatch({
                        type: GET_SALES,
                        sales: response.data.data
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getDashboardSales = (setMonthDataArray, setDonutChartData) => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/sales/monthly`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    const result = response.data.data
                    dispatch({
                        type: GET_DASHBOARD_SALES_DATA,
                        data: result
                    })
                    const barChartArr = new Array(12).fill(0)
                    const donutChartArr = new Array(12).fill(0)
                    result.forEach(i => barChartArr[i.monthNum - 1] = i.numSales)
                    result.forEach(i => donutChartArr[i.monthNum - 1] = i.revenue)
                    setMonthDataArray(barChartArr)
                    setDonutChartData(donutChartArr)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

export const getDashboardinitials = () => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/dashboard`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    const result = response.data.data
                    console.log("h",result)
                    dispatch({
                        type: GET_DASHBOARD_INITIALS,
                        data: result
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

}