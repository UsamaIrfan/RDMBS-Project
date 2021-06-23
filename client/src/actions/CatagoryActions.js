import axios from "axios";
import { GET_CATAGORIES, SERVER_API } from "./actionTypes";

export const getAllCatagories = () => {

    return (dispatch) => {
        axios.get(`${SERVER_API}/api/getcatagories`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
            .then((response) => {
                if (response.data.success === true) {
                    dispatch({
                        type: GET_CATAGORIES,
                        catagories: response.data.List
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}