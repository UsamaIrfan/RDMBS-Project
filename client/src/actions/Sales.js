import { GET_SALES, SERVER_API } from "./actionTypes"
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