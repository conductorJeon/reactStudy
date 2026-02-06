import {combineReducers} from 'redux';
import foodReducer from './foodReducer';
import recipeReducer from './recipeReducer';
import boardReducer from "./boardReducer";

export default combineReducers({
    foods: foodReducer,
    recipes: recipeReducer,
    boards: boardReducer
})