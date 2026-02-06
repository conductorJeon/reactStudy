import {FETCH_RECIPE_LIST, FETCH_RECIPE_DETAIL, FETCH_RECIPE_FIND} from "./types";
import axios from "axios";

export const fetchRecipeList = (page) => dispatch => {
    axios.get(`http://localhost/recipe/list_react/${page}`).then(
        response => {
            const action = {
                type: FETCH_RECIPE_LIST,
                payload: response.data,
            }
            // reducer로 전송 => 자동 처리 (store) => 데이터를 읽어서 화면 출력
            dispatch(action);
        })
}

export const fetchRecipeDetail = (no) => dispatch => {
    axios.get(`http://localhost/recipe/detail_react/${no}`).then(
        response => {
            const action = {
                type: FETCH_RECIPE_DETAIL,
                payload: response.data,
            }
            dispatch(action);
        }
    )
}

export const fetchRecipeFind = (page, fd) => dispatch => {
    axios.get(`http://localhost:3355/recipe/find?page=${page}&fd=${fd}`).then(response => {
        const action = {
            type: FETCH_RECIPE_FIND,
            payload: response.data,
        }
        dispatch(action);
    })
}