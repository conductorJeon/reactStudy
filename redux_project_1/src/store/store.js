import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import rootReducer from "../reducers/index";
import {createLogger} from "redux-logger";
import {thunk} from "redux-thunk";
import {combineReducers} from "redux";

const logger = createLogger()
const middleware = [thunk, logger];
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devtools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export default store;