import {FETCH_RECIPE_LIST, FETCH_RECIPE_DETAIL, FETCH_RECIPE_FIND} from "../actions/types";

const recipeState = {
    recipe_list: [],
    recipe_detail: {
        vo: {},
        tList: [],
        iList: []
    },
    recipe_find: []
}

export default function recipeReducer (state = recipeState, action)  {
    switch(action.type) {
        case FETCH_RECIPE_LIST:
            return {
                ...state,
                recipe_list: action.payload
            }
        case FETCH_RECIPE_DETAIL:
            return {
                ...state,
                recipe_detail: action.payload
            }
        case FETCH_RECIPE_FIND:
            return {
                ...state,
                recipe_find: action.payload
            }
        default:
            return state;
    }
}