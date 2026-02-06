import {FETCH_FOOD_LIST, FETCH_FOOD_DETAIL} from "./types";
import axios from "axios";

export const fetchFoodList = (page) => dispatch => {
    axios.get(`http://localhost/food/list_react/${page}`).then(
        response => {
            const action = {
                type: FETCH_FOOD_LIST,
                payload: response.data,
            }
            // reducer로 전송 => 자동 처리 (store) => 데이터를 읽어서 화면 출력
            dispatch(action);
        })
}

export const fetchFoodDetail = (fno) => dispatch => {
    axios.get(`http://localhost/food/detail_react/${fno}`).then(
        response => {
            const action = {
                type: FETCH_FOOD_DETAIL,
                payload: response.data,
            }
            dispatch(action);
        }
    )
}